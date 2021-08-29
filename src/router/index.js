import firebase from 'firebase'
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Registration from "../views/Registration";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      
       requiresAuth: true,
    }
  },
  {
   path: "/",
   redirect: "/login",
 },
  {
    path: "*",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
  },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});


router.beforeEach((to,from,next)=>{
   const currentUser = firebase.auth().currentUser;
   const requiresAuth = to.matched.some(recore=>recore.meta.requiresAuth);

   if(requiresAuth && !currentUser) next('login');
   else if (!requiresAuth && currentUser) next('home')
   else next()
})

export default router;
