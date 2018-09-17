import axios from "@/http/http"; //导入创建好的axios实例

export default {
  //帮助
  help() {
    return axios({
      url: "/api/u/help",
      method: "get"
    });
  },
  //关于我们
  aboutUs() {
    return axios.get("/api/u/company");
  },
  //注册账户
  opinion(data) {
    return axios.post("/api/u/proposal", {
      proposal: data
    });
  },
  //退出登陆
  loginout() {
    return axios.get("/api/u/esc");
  }
};
