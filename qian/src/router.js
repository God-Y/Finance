import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import StartPage from "./views/Start.vue"; //引导页
import Login from "./views/Login.vue"; //登陆页
import Commend from "./views/Commend/Commend.vue"; /* 推荐页 */
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/start",
      name: "start",
      component: StartPage
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/commend",
      name: "commend",
      component: Commend
    }
  ]
});
