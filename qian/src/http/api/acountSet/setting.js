import axios from "@/http/http"; //导入创建好的axios实例

export default {
  //实名认证
  verify(data) {
    console.log(data);
    return axios.put(`/api/u/authentication`, data);
  },

  getSetting() {
    return axios.get(`/api/u/setting`);
  },

  email(data) {
    return axios.put(`/api/u/email`, data);
  },

  address(data) {
    return axios.put(`/api/u/address`, data);
  },

  changePassword(data) {
    return axios.put(`/api/u/password`, data);
  },
  // 默认银行卡
  defaultCard(cardId) {
    return axios.put(`/api/u/reBank`, {
      id: cardId
    });
  }
};
