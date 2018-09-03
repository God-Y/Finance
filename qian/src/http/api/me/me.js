import axios from "@/http/http"; //导入创建好的axios实例

export default {
  //登陆
  getMsg() {
    return axios({
      url: "/api/u",
      method: "get"
    });
  }
};
