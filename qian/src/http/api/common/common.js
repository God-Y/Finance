import axios from "@/http/http"; //导入创建好的axios实例

export default {
  //获取轮播图
  sendImage(file) {
    return axios.post(`/api/a/upload-picture`, file);
  },

  checklogin() {
    return axios.get(`/api/loginPage`);
  },

  //获取签署合同所需要的信息
  getContractUserInfo() {
    return axios.get(`/api/u/contract-userInfo`);
  }
};
