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
// require styles
import "swiper/dist/css/swiper.css";
Vue.use(VueAwesomeSwiper);
Vue.use(Vant);

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
