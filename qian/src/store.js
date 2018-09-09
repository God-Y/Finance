import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    netWork: true, //判断是否有网
    newMsgNum: 0,
    readName: null
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
