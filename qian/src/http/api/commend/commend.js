import axios from "@/http/http"; //导入创建好的axios实例

export default {
  //获取轮播图
  GetCommendImg() {
    return axios.get(`/api/banners`);
  },
  //获取产品推荐
  productCommend() {
    return axios.get(`/api/product/recommended`);
  },

  //获取banner详情
  getBanner(id) {
    return axios.get(`/api/banner/${id}`);
  },

  //获取产品列表
  getProductList(data) {
    return axios.get(`/api//app/list/products`, {
      params: data
    });
  },

  //获取产品详情
  getProductDetailed(id) {
    return axios.get(`/api/app/product/${id}`);
  },

  //获取合同信息
  getCompactInfo() {
    return axios.get(`/api/u/contract-userInfo`);
  },

  //收益计算
  getIncome(data) {
    return axios.get(`/api/u/installment-Calculator`, {
      params: data
    });
  }
};
