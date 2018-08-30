import axios from "@/http/http"; //导入创建好的axios实例

export default {
  //获取轮播图
  GetCommendImg() {
    return axios.get(`/api/banners`);
  },
  //获取产品推荐
  productCommend() {
    return axios.get(`/api/product/recommended`);
  }
};
