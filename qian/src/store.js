import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    netWork: true, //判断是否有网
    newMsgNum: 0, //新消息的数目
    realName: "", //是否实名
    city: "", //选择城市
    user: null //保存整个用户的信息
  },
  mutations: {
    changeNetwork(state, canUse) {
      state.netWork = canUse;
    }, //无网状态
    updatedMsgNum(state, data) {
      state.newMsgNum = data.num;
    }, //更新消息数目
    reduceMsgNum(state) {
      state.newMsgNum--;
    }, //观看次数，减少阅读消息
    changeCity(state, city) {
      state.city = city;
    },
    //获取用户和真实姓名消息
    getUser(state, value) {
      state.user = value;
      state.realName = value.idName;
    }
  },
  actions: {}
});
