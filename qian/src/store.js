import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    netWork: true, //判断是否有网
    newMsgNum: 0, //新消息的数目
    realName: false, //是否实名
    city: "", //选择城市
    user: null, //保存整个用户的信息
    submitPaydata: null, //提交支付有关的数据
    financing: ""
  },
  getters: {
    real(state) {
      if (state.realName) {
        return state.realName;
      } else {
        let user = JSON.parse(sessionStorage.getItem("user"));
        return user.idAuthentication === 20;
      }
    },
    userMsg(state) {
      if (state.user) {
        return state.user;
      } else {
        let userString = sessionStorage.getItem("user");
        return JSON.parse(userString);
      }
    },
    isLogin(state) {
      if (state.isLogin) {
        return state.isLogin;
      } else {
        return sessionStorage.getItem("isLogin");
      }
    }
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
      let user = JSON.stringify(value);
      sessionStorage.setItem("user", user);
      state.user = value;
      state.realName = value.idAuthentication === 20;
    },
    login(state) {
      sessionStorage.setItem("isLogin", true);
      state.isLogin = true;
    },
    loginout(state) {
      //登出的时候， 重置这些值
      state.isLogin = false;
      state.user = "";
      state.realName = false;
      sessionStorage.clear();
    },
    changeFinancing(state, value) {
      state.financing = value;
    }
  },
  actions: {}
});
