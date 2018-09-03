import axios from "@/http/http"; //导入创建好的axios实例

export default {
  //登陆
  login(data) {
    return axios({
      // url:'/api/login/0',
      url: "http://106.14.220.166:8080/login/0",
      method: "post",
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  },
  //获取验证码
  getCode(phoneNum) {
    return axios.post("/code", {
      phone: phoneNum
    });
  },
  //修改密码
  findPwd(data) {
    return axios.put("/forgetPassword", data);
  },
  //注册账户
  register(data) {
    return axios.post("/login/1", data);
  }
};
