import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import StartPage from "./views/user/Start.vue"; //引导页
import Login from "./views/user/Login.vue"; //登陆页
import FindPassword from "./views/user/FindPassword.vue"; //登陆页
import Register from "./views/user/Register.vue"; /* 注册页 */
import UserProtocol from "./views/user/UserProtocol.vue"; /* 用户协议 */
import PrivasyClause from "./views/user/PrivacyClause.vue"; /* 隐私条款 */
import Commend from "./views/Commend/Commend.vue"; /* 推荐页 */
import MePage from "./views/Me/Me.vue"; /* 推荐页 */
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
      path: "/start", //启动页
      name: "start",
      component: StartPage
    },
    {
      path: "/login", //登录页
      name: "login",
      component: Login
    },
    {
      path: "/commend",
      name: "commend",
      component: Commend
    },
    {
      path: "/find-password", //找回密码
      name: "findPassword",
      component: FindPassword
    },
    {
      path: "/register", //注册页
      name: "register",
      component: Register
    },
    {
      path: "/user-protocol", //用户协议
      name: "userProtocol",
      component: UserProtocol
    },
    {
      path: "/privasy-clause", //隐私条款
      name: "privasyClause",
      component: PrivasyClause
    },
    {
      path: "/me", //我的页面
      name: "me",
      component: MePage
    }
  ]
});
