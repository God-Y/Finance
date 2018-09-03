import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/common.css";
import vfilters from "./assets/filter/filter";
//外部组件
import Vant from "vant"; //引入vant
import "vant/lib/vant-css/index.css";
import api from "./http/api/index"; //挂载封装好的api
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import "lib-flexible";
import Carousel3d from "vue-carousel-3d";
Vue.use(Carousel3d); /* 3d轮播 */

import MescrollVue from "mescroll.js/mescroll.vue";
Vue.use(VueAwesomeSwiper);
Vue.use(Vant);
Vue.use(MescrollVue);

Vue.config.productionTip = false;
Vue.prototype.$api = api; //挂载封装好的api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

for (let key in vfilters) {
  Vue.filter(key, vfilters[key]);
}
