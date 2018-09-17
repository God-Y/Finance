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
  mounted() {},
  methods: {
    nextStep() {
      localStorage.setItem("user", JSON.stringify(this.user));
      this.$router.push({
        path: "/uploadImg"
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
