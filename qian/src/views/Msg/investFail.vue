<template>
  <div class="msg-list">
   <common-header title="投资失败"></common-header>
   <div class="result-box">
      <img 
        src="@/assets/img/pay/fail.png" 
        class="result-img" >
      <div class="result-text">{{resultText}}</div>
    </div>
  </div>
</template>
 
<script>
import CommonHeader from "common/CommonHeader";
export default {
  name: "InvestFail",
  components: {
    CommonHeader
  },
  computed: {
    msg() {
      return this.$route.params.id;
    },
    resultText() {
      return this.msg + "投资失败";
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
  color: "#ed4630";
}
</style>
