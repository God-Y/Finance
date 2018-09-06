import axios from "@/http/http"; //导入创建好的axios实例

export default {
  //登陆
  getMsg() {
    return axios({
      url: "/api/u",
      method: "get"
    });
  },
  //交易流水，默认为第一页
  getList(pages = 1) {
    return axios({
      url: "/api/u/transaction",
      method: "get",
      params: {
        pageNum: pages
      }
    });
  },
  getTradingDetial(id) {
    return axios({
      url: `/api/u/transaction/${id}`,
      method: "get"
    });
  }
};
