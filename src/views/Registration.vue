<template>
  <ElCard class="form-card">
    <div class="header" slot="header">
      <h2>Sign up</h2>
    </div>
    <ElForm
      :model="formRegistration"
      ref="formRegistration"
      label-position="top"
      :rules="rules"
    >
      <ElFormItem label="Email" prop="email">
        <ElInput v-model="formRegistration.email" />
      </ElFormItem>
      <ElFormItem label="Password" prop="password">
        <ElInput v-model.number="formRegistration.password" />
      </ElFormItem>
      <ElButton type="primary" @click="signUp">Submit</ElButton>
    </ElForm>
  </ElCard>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Registration",
  data() {
     var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password'));
        } else {
          setTimeout(() => {
             if (this.formRegistration.password !== '') {
            this.$refs.formRegistration.validateField('password');
          }
          callback();
          }, 1000);
         
        }
      };
    return {
      formRegistration: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Please input email address",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"],
          },
        ],
        password: [{  required: true,validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    signUp() {
      this.$refs.formRegistration.validate((valid) => {
        if (valid) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(
              this.formRegistration.email,
              this.formRegistration.password
            )
            .then(
              (user) => {
                console.log("Account has been created!");
                this.$router.replace("home");
              },
              (err) => {
                alert("Oops");
              }
            );
        } else {
          console.log("error submit!!");
          return false;
        }
         this.$refs.formRegistration.resetFields();
      });
    },
  },
};
</script>

<style scoped>
.form-card {
  max-width: 500px;
  margin: auto;
}
.type-select {
  width: 100%;
}
</style>
