<template>
  <div class="find-box">
    <common-header title="找回密码"></common-header>
    <find-pwd-input :find-msg="findData"></find-pwd-input>
    <div class="footer">
      <van-button type="warning" class="submit-btn" @click = "submit" :disabled="submitUse">确认</van-button>
    </div>
  </div>
</template>
 
<script>
import CommonHeader from "common/CommonHeader";
import FindPwdInput from "@/components/Login/FindPwdInput";
export default {
  name: "FindPassword",
  components: {
    CommonHeader,
    FindPwdInput
  },
  data() {
    return {
      findData: {
        phone: "",
        password: "",
        rePassword: "",
        code: ""
      },
      submitUse: true //提交按钮
    };
  },
  watch: {
    //未输入完全置灰按钮
    findData: {
      handler(newValue) {
        //通过use中间值以及遍历来循环整个对象
        let use = true;
        for (let item in newValue) {
          if (newValue[item]) {
            use = use && true;
          } else {
            use = use && false;
          }
        }
        this.submitUse = !use;
      },
      deep: true
    }
  },
  methods: {
    submit() {
      this.$api.user.findPwd(this.findData).then(res => {
        let data = res.data;
        this.$toast(data.message);
        if (data.code == 1) {
          //正确登录跳转精品推荐
          setTimeout(() => {
            this.$router.push("/login");
          }, 2000);
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
}
</style>
