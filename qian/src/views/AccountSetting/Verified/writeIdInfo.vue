<template>
  <div>
    <commenHeader title="实名认证"></commenHeader>
    <van-cell-group class="input-box">
      <van-field
        class="input-style"
        v-model="user.idName"
        clearable
        label="姓名"
        placeholder="请输入真实姓名"/>
      <van-field
        class="input-style"
        v-model="user.idNumber"
        type="text"
        label="身份证号"
        placeholder="请输入身份证号"/>
    </van-cell-group>
    <div class="button-box">
      <van-button :disabled="checkInput" @click="nextStep" class="button-style" type="warning">下一步</van-button>
    </div>
  </div>
</template>
 
<script>
import { Toast } from "vant";
import commenHeader from "common/CommonHeader.vue";
export default {
  name: "writeIdInfo",
  components: {
    commenHeader
  },
  data() {
    return {
      user: {}
    };
  },
  created() {},
  computed: {
    checkInput() {
      if (!!this.user.idNumber && !!this.user.idName) {
        return false;
      } else {
        return true;
      }
    } /* 监听button显示否 */
  },
  beforeRouteLeave(to, from, next) {
    this.user = {};
    next();
  }, //退出组件清空输入框
  mounted() {},
  methods: {
    nextStep() {
      let idPattern = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (!idPattern.test(this.user.idNumber)) {
        Toast.fail("请输入正确的身份证号！");
        return false;
      } else {
        localStorage.setItem("user", JSON.stringify(this.user));
        this.$router.push({
          path: "/uploadImg"
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.input-box {
  margin-top: 10px;
}
.input-style {
  display: flex;
  align-items: center;
  height: 60px;
}
.button-box {
  padding: 0 15px;
  margin-top: 30px;
}
.button-style {
  width: 100%;
}
</style>
