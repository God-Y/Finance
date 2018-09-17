<template>
  <div class="find-box">
    <common-header title="注册"></common-header>
    <register-input :register-msg="data"></register-input>
    <div class="footer">
      <van-button 
        type="warning" 
        class="submit-btn" 
        @click = "submit" 
        :disabled="submitUse">立即注册</van-button>
    <p class="go-login" @click="$router.push('/login')">已有账号?<span>登陆</span></p>
    </div>
  </div>
</template>
 
<script>
import CommonHeader from "common/CommonHeader";
import RegisterInput from "@/components/Login/RegisterInput";
export default {
  name: "Register",
  components: {
    CommonHeader,
    RegisterInput
  },
  data() {
    return {
      data: {
        phone: "",
        password: "",
        rePassword: "",
        code: "",
        managerNumber: ""
      },
      submitUse: true //提交按钮
    };
  },
  watch: {
    //未输入完全置灰按钮
    data: {
      handler(newValue) {
        if (
          newValue.phone &&
          newValue.password &&
          newValue.rePassword &&
          newValue.code
        ) {
          this.submitUse = false;
        } else {
          this.submitUse = true;
        }
      },
      deep: true
    }
  },
  methods: {
    submit() {
      this.$api.user.register(this.data).then(res => {
        let data = res.data;
        this.$toast(data.message);
        if (data.code == 1) {
          //注册后跳转到实名认证页面
          setTimeout(() => {
            this.$router.push("/commend");
          }, 1000);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
//启动页
.find-box {
  background: $bg-gray;
  .footer {
    width: 92%;
    margin: 30px auto;
    .submit-btn {
      width: 100%;
      color: #fff;
    }
  }
  .go-login {
    float: right;
    span {
      color: #d7a95e;
      font-size: 13px;
    }
  }
}
</style>
