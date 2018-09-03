import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import StartPage from "./views/Start.vue"; //引导页
import Login from "./views/Login.vue"; //登陆页
import Commend from "./views/Commend/Commend.vue"; /* 推荐页 */
import bannerDetailed from "./views/Commend/BannerDetailed.vue"; /* banner详情页 */
import financingList from "./views/Financing/FinancingList.vue"; /* 理财列表 */
import productList from "./views/Financing/productList.vue"; /* 理财列表 */
import addList from "./views/Financing/AddList.vue"; /* 理财列表 */
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
    } /* 推荐 */,
    {
      path: "/bannerDetailed",
      name: "bannerDetailed",
      component: bannerDetailed
    } /* 推荐banner图详情 */,
    {
      path: "/financingList",
      name: "financingList",
      component: financingList,
      children: [
        {
          path: "productList",
          component: productList
        } /* 产品列表 */,
        {
          path: "addList",
          component: addList
        }
      ]
    }
  ]
});
