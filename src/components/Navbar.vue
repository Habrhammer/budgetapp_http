<template>
  <div class="header">
    <el-menu default-active="/registration" :router="true" mode="horizontal">
      <template v-if="isLogin">
        <el-menu-item index="/home"  @click="logOut">Log Out</el-menu-item>
      </template>
      <template v-else>
        <el-menu-item index="/registration" >Sign up</el-menu-item>
        <el-menu-item index="/login" >Log In</el-menu-item>
      </template>   
    </el-menu>
    <div class="line"></div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isLogin: true,
    };
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    ...mapGetters("list", ["totalBalance", "getIsAuth"]),

  },
  watch: {},
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  },
};
</script>

<style scoped>
.header {
  margin-bottom: 35px;
}
.el-menu {
  display: flex;
  justify-content: flex-end;
}
</style>
