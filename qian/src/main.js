import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/common.css";
import vfilters from "./assets/filter/filter";
//外部组件
import Vant from "vant"; //引入vant
import { Toast } from "vant";
import "vant/lib/vant-css/index.css";
import api from "./http/api/index"; //挂载封装好的api
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import "lib-flexible";
import Carousel3d from "vue-carousel-3d";
// import { networkInterfaces } from "os";
Vue.use(Carousel3d); /* 3d轮播 */

Vue.use(VueAwesomeSwiper);
Vue.use(Vant); /* 轮播 */

Vue.config.productionTip = false;
Vue.prototype.$api = api; //挂载封装好的api

function getCookie(name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) {
    return unescape(arr[2]);
  } else {
    return null;
  }
}

for (let key in vfilters) {
  Vue.filter(key, vfilters[key]);
}
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    let isLogin = store.getters.isLogin;
    if (isLogin && getCookie("cookie")) {
      //如果登陆状态存在，直接跳转到下一页
      next();
    } else {
      Toast.fail("请先登陆");
      setTimeout(() => {
        next({
          path: "/login"
        });
      }, 1000);
    }
  } else {
    next();
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
