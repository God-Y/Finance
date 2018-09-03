<template>
  <div class="register-input">
      <!-- 输入手机号 -->
      <div 
        class="van-hairline--bottom input-container"
        :class="{'input-container-border':phoneShow}"
      >
        <label for="phone" class="label-item">
          <img src="@/assets/img/user/phone.png">
        </label>
        <input 
          type="text" 
          v-model="registerData.phone" 
          @input="toNumber(registerData.phone)" 
          @focus="focus('phoneShow')"
          @blur="blur('phoneShow')"
          maxlength="11"
          ref="phone"
          id="phone" 
          class="input-item"
          placeholder="请输入11位手机号"
        >
        <img 
          src="@/assets/img/user/close.png" 
          class="close-btn" 
          v-if="phoneShow"
          @click="clearData('phone')"
        >
      </div>
      <!-- 输入验证码 -->
      <div 
        class="van-hairline--bottom input-container"
        :class="{'input-container-border':codeShow}"
      >
        <label for="code" class="label-item">
          <img src="@/assets/img/user/safe.png">
        </label>
        <input 
          type="text" 
          v-model="registerData.code" 
          @focus="focus('codeShow')"
          @blur="blur('codeShow')"
          maxlength="6"
          ref="code"
          id="code" 
          class="input-item"
          placeholder="输入验证码"
        >
        <van-button 
          type="default" 
          class="sendCode-btn" 
          :disabled ="getCode" 
          @click.stop.prevent="sends"
        >{{getCodeTitle}}</van-button>
      </div>
      <!-- 新密码 -->
      <div 
        class="van-hairline--bottom pwd-container"
        :class="{'input-container-border':pwdShow}"
      >
        <label for="password" class="label-item">
          <img src="@/assets/img/user/lock.png">
        </label>
        <input 
          :type="pwdType" 
          v-model="registerData.password"
          id="password" 
          class="input-item"
          @focus="focus('pwdShow')"
          @blur="blur('pwdShow')"
          ref='password'
          placeholder="输入新密码"
        >
        <img 
          src="@/assets/img/user/close.png" 
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
      <!-- 确认密码 -->
      <div 
        class="van-hairline--bottom pwd-container"
        :class="{'input-container-border':rePwdShow}"
      >
        <label for="rePassword" class="label-item">
          <img src="@/assets/img/user/lock.png">
        </label>
        <input 
          :type="rePwdType" 
          v-model="registerData.rePassword"
          id="rePassword" 
          class="input-item"
          @focus="focus('rePwdShow')"
          @blur="blur('rePwdShow')"
          ref='rePassword'
          placeholder="确认新密码"
        >
        <img 
          src="@/assets/img/user/close.png" 
          class="close-btn" 
          v-if="rePwdShow"
          @click.stop ="clearData('rePassword')"
        >
        <span 
          class="iconfont  see-pwd" 
          :class="[seeRePwdShow ? 'icon-attention_light' : 'icon-attentionforbid']"
          v-if="rePwdShow" 
          @click.prevent="seeRePwd()"
        ></span>
      </div>
      <!-- 经理工号 -->
      <div 
        class="van-hairline--bottom pwd-container"
        :class="{'input-container-border':manageShow}"
      >
        <label for="managerNumber" class="label-item">
          <img src="@/assets/img/user/lock.png">
        </label>
        <input 
          type="text" 
          v-model="registerData.managerNumber"
          id="managerNumber" 
          class="input-item"
          @focus="focus('manageShow')"
          @blur="blur('manageShow')"
          ref='manageShow'
          placeholder="输入理财经理工号(选填)"
        >
      </div>
      <p class="allow-msg">注册即表示同意
        <span @click="$router.push('/user-protocol')">《用户协议》</span>和
        <span  @click="$router.push('/privasy-clause')">《隐私条款》</span>
      </p>
  </div>
</template>
<script>
export default {
  name: "RegisterInput",
  props: {
    registerMsg: Object //定义登录用的数据
  },
  data() {
    return {
      registerData: this.registerMsg, //赋值给registerData
      phoneShow: false, //手机号码输入框
      pwdShow: false, //密码输入框
      codeShow: false, //验证码输入框
      rePwdShow: false, //密码输入框
      seePwdShow: true, //查看密码图标,
      seeRePwdShow: true, //查看确定密码图标,
      manageShow: false,
      getCode: true, //短信验证按钮能否发送请求
      getCodeTitle: "短信验证",
      pwdType: "password", //用来控制密码输入框
      rePwdType: "password" //用来控制密码输入框
    };
  },
  computed: {
    phone() {
      return this.registerData.phone;
    }
  },
  watch: {
    //通过计算属性来确定手机号码是否有效
    phone(newValue) {
      let pattern = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
      this.getCode = pattern.test(newValue) ? false : true;
    }
  },
  methods: {
    //定义@input方法，规定输入只能输入数字
    toNumber(value) {
      this.registerData.phone = value.replace(/\D/, "");
      //手机号码第一位应该不为0
      if (value.length === 1 && value === "0") {
        this.registerData.phone = "";
      }
    },
    //选中登陆框，出现边框以及消失按钮
    focus(value) {
      this[value] = true;
    },
    //手机输入框失去焦点
    blur(value) {
      this[value] = false;
    },
    //查看密码
    seePwd() {
      let pwd = this.$refs.password;
      pwd.focus(); //点击事件需要保留焦点
      this.seePwdShow = !this.seePwdShow; //查看密码图标
      this.pwdType = this.pwdType === "password" ? "text" : "password";
    },
    seeRePwd() {
      let pwd = this.$refs.rePassword;
      pwd.focus(); //点击事件需要保留焦点
      this.seeRePwdShow = !this.seeRePwdShow; //查看密码图标
      this.rePwdType = this.rePwdType === "password" ? "text" : "password";
    },
    //删除数据
    clearData(value) {
      this.registerData[value] = "";
      this.$refs[value].focus();
    },
    //发送验证码的逻辑
    sends() {
      this.getCode = true;
      let second = 60;
      let that = this;
      let timer = setInterval(() => {
        that.getCodeTitle = second + "s";
        second--;
        if (second == 0) {
          //时间为0，清除过滤器
          window.clearInterval(timer);
          that.getCode = false;
          that.getCodeTitle = "短信验证";
        }
      }, 1000);
      //发送请求获取验证码
      this.$api.user.getCode(this.registerData.phone).then(res => {
        let data = res.data;
        if (data.code == -1) this.$toast(data.message);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.register-input {
  margin-top: 11px;
  .sendCode-btn {
    @extend %po-valign;
    right: 0;
    font-size: 13px;
    color: $btn-bgcolor;
  }
  .allow-msg {
    font-size: 13px;
    padding-left: 15px;
    letter-spacing: 1px;
    span {
      color: #18acff;
    }
  }
}
</style>
