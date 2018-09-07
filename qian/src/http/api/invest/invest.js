import axios from "@/http/http"; //导入创建好的axios实例

export default {
  //获取投资中的列表
  investList(status, pages = 1) {
    return axios.get(`/api/u/investments`, {
      params: {
        investmentStatus: status,
        pageNum: pages
      }
    });
  },
  //根据ID获取详情
  investDetial(id) {
    return axios.get(`/api/u/userInvestment/${id}`);
  }
};
