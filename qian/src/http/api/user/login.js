import axios from "@/http/http"; //导入创建好的axios实例

export default {
  //登陆
  login(data) {
    return axios({
      url: "/api/login/0",
      method: "post",
      data: data
    });
  },
  //获取验证码
  getCode(phoneNum) {
    return axios.post("/api/code", {
      phone: phoneNum
    });
  },
  //修改密码
  findPwd(data) {
    return axios.put("/api/forgetPassword", data);
  },
  //注册账户
  register(data) {
    return axios.post("/api/login/1", data);
  }
};
