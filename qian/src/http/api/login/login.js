import axios from "@/http/http"; //导入创建好的axios实例

export default {
  //登陆
  getList(data) {
    return axios.get(`/api/a/list/bank`, {
      params: data
    });
  }

};
