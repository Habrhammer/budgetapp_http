<template>
  <ElCard class="form-card">
    <div class="header" slot="header">
      <h2>Log in</h2>
    </div>
    <ElForm :model="formAuth" ref="authForm" label-position="top" :rules="rules">
      <ElFormItem label="Email" prop="email">
        <ElInput v-model="formAuth.email" />
      </ElFormItem>
      <ElFormItem label="Password" prop="password">
        <ElInput v-model.number="formAuth.password" />
      </ElFormItem>
      <ElButton type="primary" @click="authApp">Submit</ElButton>
    </ElForm>
  </ElCard>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Login",
  data() {
       var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password'));
        } else {
          setTimeout(() => {
             if (this.formAuth.password !== '') {
            this.$refs.authForm.validateField('password');
          }
          callback();
          }, 1000);
         
        }
      };
    return {
      formAuth: {
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

    
    authApp() {
         this.$refs.authForm.validate((valid) => {
        if (valid) {
       firebase
        .auth()
        .signInWithEmailAndPassword(this.formAuth.email, this.formAuth.password)
        .then((user) => {
          this.$router.replace("home");
        })
        .catch((err) => {
          alert(`Oops! ${err.message}`);
          // console.log(err.message);
        });

        } else {
          console.log("error submit!!");
          return false;
        }
         this.$refs.authForm.resetFields();
      });
      // firebase
      //   .auth()
      //   .signInWithEmailAndPassword(this.formAuth.email, this.formAuth.password)
      //   .then((user) => {
      //     this.$router.replace("home");
      //   })
      //   .catch((err) => {
      //     console.log("Oops");
      //     console.log(err.message);
      //   });

      // this.$refs.authForm.resetFields();
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(`Вы авторизованы! Ваш логин: ${user.email}`);
      } else {
        console.log("Вы не авторизованы!");
      }
    });
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
