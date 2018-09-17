<template>
  <div class="box">
    <commenHeader class="header-style" title="修改密码"></commenHeader>
    <div class="input-box">
        <van-field
        v-model="user.oldPassword"
      class="input-style"
      placeholder="输入原密码"
      left-icon="contact"/>
      <van-field
      v-model="user.password"
      class="input-style"
        placeholder="输入新密码"
        left-icon="contact"/>
      <van-field
      v-model="user.rePassword"
      class="input-style"
        placeholder="确认新密码"
        left-icon="contact"/>
    </div>
    <div class="button-box">
      <van-button @click="sendData" :disabled="check" class="button-style" type="warning">确认</van-button>
    </div>
    <p v-if="user.password && user.rePassword" class="check">{{checkPassword}}</p>
  </div>
</template>
 
<script>
import { Toast } from "vant";
import { Dialog } from "vant";
import commenHeader from "common/CommonHeader.vue";
export default {
  name: "verify",
  components: {
    commenHeader,
    Dialog
  },
  data() {
    return {
      user: {}
    };
  },
  activated() {},
  created() {},
  computed: {
    check() {
      if (this.user.oldPassword && this.user.password && this.user.rePassword) {
        return false;
      } else {
        return true;
      }
    },
    checkPassword() {
      if (this.user.password !== this.user.rePassword) {
        return "新密码和确认密码不一致";
      }
    }
  },
  mounted() {},
  methods: {
    sendData() {
      this.$api.setting.changePassword(this.user).then(res => {
        console.log(res);
        if (res.data.code === 1) {
          Toast.success("修改成功,请重新登录");
          this.$router.push({
            path: "/login"
          });
        } else {
          let message = res.data.message;
          Toast.fail(message);
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.input-box {
  margin-top: 10px;
}
.input-style {
  height: 60px;
  display: flex;
  align-items: center;
  input::before {
    border-left: 1px solid #e8e8e8;
  }
}
.button-box {
  margin-top: 30px;
  padding: 0 15px;
}
.button-style {
  width: 100%;
}
.check {
  text-align: center;
  color: red;
}
</style>
