<template>
  <ElCard class="form-card">
    <ElForm :model="formAuth" ref="authForm" label-position="top">
      <ElFormItem label="Login" prop="comment">
        <ElInput v-model="formAuth.email" />
      </ElFormItem>
      <ElFormItem label="Password" prop="value">
        <ElInput v-model.number="formAuth.password" />
      </ElFormItem>
      <ElButton type="primary" @click="authApp">Submit</ElButton>
    </ElForm>
  </ElCard>
</template>

<script>
import firebase from "firebase";
export default {
  name: "FormAuth",
  data() {
    return {
      formAuth: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    authApp() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.formAuth.email, this.formAuth.password)
        .then(
          function(user) {
            alert("Well done!");
          },
          function(err) {
            alert("Oops");
          }
        );

      this.$refs.authForm.resetFields();
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
