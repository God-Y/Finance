<template>
  <div class="login">
    <common-header title="登录"></common-header>
    <login-input :login-msg="user"></login-input>
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
}
</style>
