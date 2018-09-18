<template>
  <div class="msg-list">
   <common-header title="实名消息"></common-header>
   <div class="result-box">
      <img 
        src="@/assets/img/pay/fail.png" 
        class="result-img" v-if="!resultImg">
      <img 
        src="@/assets/img/pay/success.png" 
        class="result-img" v-else>
      <div class="result-text" :style="textStyle">{{resultText}}</div>
    </div>
  </div>
</template>
 
<script>
import CommonHeader from "common/CommonHeader";
export default {
  name: "MessageList",
  components: {
    CommonHeader
  },
  computed: {
    resultImg() {
      return this.$route.params.id == 100;
    },
    ID() {
      return this.$route.params.id;
    },
    resultText() {
      switch (~~this.ID) {
        case 100:
          return "实名通过";
        case 101:
          return "实名未通过";
        case 102:
          return "取消实名";
      }
    },
    textStyle() {
      switch (~~this.ID) {
        case 100:
          return { color: "#5bbc11" };
        default:
          return { color: "#ed4630" };
      }
    }
  }
};
</script>
<style lang="scss" scoped>
//message
.result-box {
  margin-top: 115px;
  text-align: center;
}
.result-img {
  width: 88px;
}
.result-text {
  font-size: 15px;
}
</style>
