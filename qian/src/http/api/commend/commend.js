import axios from "@/http/http"; //导入创建好的axios实例

export default {
  //获取轮播图
  GetCommendImg() {
    return axios.get(`/api/app/list/banners`);
  },
  //获取产品推荐
  productCommend() {
    return axios.get(`/api/app/products/recommend`);
  },

  //获取banner详情
  getBanner(id) {
    return axios.get(`/api/banner/${id}`);
  },

  //获取产品列表
  getProductList(data) {
    return axios.get(`/api/app/list/products`, {
      params: data
    });
  },

  //获取产品详情
  getProductDetailed(id) {
    console.log(id);
    return axios.get(`/api/app/product/${id}`);
  },

  //获取合同信息
  getCompactInfo(id) {
    return axios.get(`/api/u/investment-contract/${id}`);
  },

  //收益计算
  getIncome(data) {
    return axios.get(`/api/u/installment-Calculator`, {
      params: data
    });
  },

  //获取续投详情列表
  getRenewalProducts(data) {
    return axios.get(`/api/u/list/renewal-products`, {
      params: data
    });
  },

  renewalData(id) {
    return axios.get(`/api/u/renewal/investment-user/${id}`);
  } /* 续投产品详情 */,

  renewalInvestment(data) {
    return axios.post(`/api/u/renewal-investment-user`, {
      params: data
    });
  }, //产品续投接口

  userInvestment(data) {
    return axios.post(`/api/u/user-investment`, data);
  } //用户投资接口
};
