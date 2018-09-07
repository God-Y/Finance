import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    netWork: true,
    newMsgNum: 0
  },
  mutations: {
    changeNetwork(state, canUse) {
      state.netWork = canUse;
    },
    updatedMsgNum(state, data) {
      state.newMsgNum = data.num;
    },
    reduceMsgNum(state) {
      state.newMsgNum--;
    }
  },
  actions: {}
});
