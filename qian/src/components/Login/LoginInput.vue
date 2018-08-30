<template>
  <div class="login-input">
    <form>
      <div 
        class="van-hairline--bottom input-container"
        :class="{'input-container-border':phoneShow}"
      >
        <label for="username" class="label-item">
          <img src="@/assets/img/phone.png">
        </label>
        <input 
          type="text" 
          v-model="LoginData.phone" 
          @input="toNumber(username)" 
          @focus="focus('phoneShow')"
          @blur="phoneBlur"
          maxlength="11"
          ref="username"
          id="username" 
          class="input-item"
        >
        <img 
          src="@/assets/img/close.png" 
          class="close-btn" 
          v-if="phoneShow"
          @click="clearData('phone')"
        >
      </div>
      <div 
        class="van-hairline--bottom pwd-container"
        :class="{'input-container-border':pwdShow}"
      >
        <label for="password" class="label-item">
          <img src="@/assets/img/lock.png">
        </label>
        <input 
          :type="pwdType" 
          v-model="LoginData.password"
          id="password" 
          class="input-item"
          @focus="pwdFocus()"
          @blur="pwdBlur"
          ref='password'
        >
        <img 
          src="@/assets/img/close.png" 
          class="close-btn" 
          v-if="pwdShow"
          @click.stop ="clearData('password')"
        >
        <span 
          class="iconfont  see-pwd" 
          :class="[seePwdShow ? 'icon-attention_light' : 'icon-attentionforbid']"
          v-if="pwdShow" 
          @click.prevent="seePwd()"
        ></span>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "LoginInput",
  props: {
    LoginMsg: Object //定义登录用的数据
  },
  data() {
    return {
      LoginData: this.LoginMsg, //赋值给loginData
      phoneShow: false, //手机号码输入框
      pwdShow: false, //密码输入框
      seePwdShow: true, //查看密码图标,
      pwdType: "password" //用来控制密码输入框
    };
  },
  methods: {
    //定义@input方法，规定输入只能输入数字
    toNumber(value) {
      this.LoginData.phone = value.replace(/\D/, "");
    },
    //选中登陆框，出现边框以及消失按钮
    focus(value) {
      this[value] = true;
    },
    //手机输入框失去焦点
    phoneBlur(value) {
      this.phoneShow = false;
      console.log(value);
    },
    pwdFocus() {
      this.pwdShow = true;
      // console.log(111111111111111111111)
    },
    //密码输入框失去焦点
    pwdBlur(value) {
      console.log(value);
      this.pwdShow = false;
      this.pwdType = "password";
      this.seePwdShow = true;
      // console.log(5222222222222222)
    },
    //查看密码
    seePwd() {
      let pwd = this.$refs.password;
      pwd.focus(); //点击事件需要保留焦点
      this.seePwdShow = !this.seePwdShow; //查看密码图标
      // console.log(this.seePwdShow,3333333333333333333)
      this.pwdType = this.pwdType === "password" ? "text" : "password";
    },
    clearData(value) {
      this[value] = "";
      this.$refs[value].focus();
    }
  }
};
</script>
<style lang="scss" scoped>
.login-input {
  margin-top: 10px;
  .input-container-border {
    border: 1px solid $input-border-color !important;
    border-radius: 5px;
  }
  .input-container,
  .pwd-container {
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    border: 1px solid transparent;
    background: #fff;
    .close-btn {
      @extend %po-valign;
      right: 10px;
      padding: 10px 5px;
      width: 16px;
      z-index: 5;
    }
    .input-item {
      width: 88%;
      height: 60px;
      padding-left: 60px;
      border: none;
      font-size: 16px;
    }
    .label-item {
      @extend %po-valign;
      padding: 8px 15px;
      font-size: 0;
      &::after {
        content: "";
        @extend %po-valign;
        left: 44px;
        width: 1px;
        height: 20px;
        background: #e8e8e8;
      }
      span {
        font-size: 30px;
      }
      img {
        width: 14px;
      }
    }
  }
  .pwd-container {
    .see-pwd {
      @extend %po-valign;
      right: 35px;
      font-size: 24px;
      padding: 10px 5px;
    }
  }
}
</style>
