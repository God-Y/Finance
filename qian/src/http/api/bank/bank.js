import axios from "@/http/http"; //导入创建好的axios实例

export default {
  //添加银行卡
  addBankCard(data) {
    return axios.post(`/api/u/banks`, data);
  },
  //获取银行卡
  getBankCard() {
    return axios.get(`/api/u/banks`);
  },
  //银行卡管理
  manageBankCard() {
    return axios.get(`/api/u/bank`);
  },
  //默认银行卡管理
  defaultBankCard(id) {
    return axios.get(`/api/u/bank/${id}`);
  }
};
