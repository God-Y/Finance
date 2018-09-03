import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    netWork: true
  },
  mutations: {
    changeNetwork(state, canUse) {
      state.netWork = canUse;
    }
  },
  actions: {}
});
