import Vue from "vue";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import App from "./App.vue";
import "./plugins/elements";
import store from './store'


var firebaseConfig = {
  apiKey: "AIzaSyByyuf7Oi_jHchwsXUAYmIXEOWqq2kpqyI",
  authDomain: "vue-with-http-b929f.firebaseapp.com",
  databaseURL: "https://vue-with-http-b929f-default-rtdb.firebaseio.com",
  projectId: "vue-with-http-b929f",
  storageBucket: "vue-with-http-b929f.appspot.com",
  messagingSenderId: "888155273858",
  appId: "1:888155273858:web:b98742b65365c6dc9f929b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);




Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
