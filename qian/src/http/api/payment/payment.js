import axios from "@/http/http"; //导入创建好的axios实例

export default {
  //得到信息
  getMsg() {
    return axios({
      url: "/api/u/message",
      method: "get"
    });
  }
};
