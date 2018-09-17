<template>
  <div class="login">
    <common-header title="登录"></common-header>
    <login-input :login-msg="user"></login-input>
    <div class="footer">
      <van-button type="warning" class="login-btn" @click = "login" :disabled="loginUse">登录</van-button>
      <span class="register" @click="$router.push('/register')">立即注册</span>
      <span class="forget-pwd" @click="$router.push('/find-password')">忘记密码?</span>
    </div>
  </div>
</template>
 
<script>
import CommonHeader from "common/CommonHeader";
import LoginInput from "@/components/Login/LoginInput";
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
      },
      loginUse: true
    };
  },
  watch: {
    //未输入完全置灰按钮
    user: {
      handler(newValue) {
        if (newValue.phone && newValue.password) {
          this.loginUse = false;
        } else {
          this.loginUse = true;
        }
      },
      deep: true
    }
  },
  methods: {
    login() {
      this.$api.user.login(this.user).then(res => {
        console.log(res);
        let data = res.data;
        this.$toast(data.message);
        if (data.code == 1) {
          //正确登录跳转精品推荐
          this.getUser();
          this.$store.commit("login");
        }
      });
    },
    //获取数据，往仓库中更新数据
    getUser() {
      this.$api.me.getMsg().then(res => {
        console.log(document.cookie);
        let data = res.data;
        if (data.code) {
          //这里写入对象
          this.$store.commit("getUser", data.data);
          this.$router.push("/me");
        }
      });
    }
  }
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
      color: #fff;
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
