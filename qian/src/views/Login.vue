<template>
  <div class="login">
    <common-header title="登录"></common-header>
    <login-input :login-msg="user"></login-input>
    <div class="footer">
      <van-button type="warning" class="login-btn">登录</van-button>
      <span class="register">立即注册</span>
      <span class="forget-pwd">忘记密码?</span>
    </div>
  </div>
</template>
 
<script>
import CommonHeader from "common/CommonHeader";
import LoginInput from "../components/Login/LoginInput";
export default {
  name: "Login",
  components: {
    CommonHeader,
    LoginInput
  },
  data() {
    return {
      user: {
        phone: "",
        password: ""
      }
    };
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
//启动页
.login {
  background: $bg-gray;
  .footer {
    width: 92%;
    margin: 30px auto;
    .login-btn {
      width: 100%;
    }
    .register,
    .forget-pwd {
      font-size: 13px;
      padding-top: 10px;
      color: #666;
    }
    .register {
      float: left;
    }
    .forget-pwd {
      float: right;
    }
  }
}
</style>
