<template>
  <div class="pay-result">
    <common-header title="支付结果" class="header"></common-header>
    <div class="result-box">
      <img 
        src="@/assets/img/pay/fail.png" 
        class="result-img" v-if="resultImg">
      <img 
        src="@/assets/img/pay/success.png" 
        class="result-img" v-else>
      <div class="result-text" :style="textStyle">{{resultText}}</div>
    </div>
    <footer class="footer">
      <van-button 
        class="button-style" 
        type="warning"
        @click="submitPay"
      >{{btnMsg}}</van-button>
      <van-button 
        v-if="!resultImg"
        class="button-bottom" 
        type="warning"
         plain
         @click="$router.push('/financingList')"
      >返回列表</van-button>
    </footer>
  </div>
</template>
 
<script>
import CommonHeader from "common/CommonHeader";

export default {
  name: "PayResult",
  components: {
    CommonHeader
  },
  data() {
    return {
      resultImg: null,
      resultText: "",
      textStyle: null,
      btnMsg: ""
    };
  },
  created() {
    this.resultImg = this.$route.params.msg == 0 ? true : false;
    if (this.resultImg) {
      this.resultText = "支付失败";
      this.textStyle = {
        color: "#ed4630"
      };
      this.btnMsg = "重新购买";
    } else {
      this.resultText = "支付成功";
      this.textStyle = {
        color: "#5bbc11"
      };
      this.btnMsg = "查看订单";
    }
  },
  computed: {
    // resultImg() {
    //   //成功是1 失败是0
    //   return this.$route.params.msg == 0 ? true : false;
    // },
    // resultText() {
    //   return this.$route.params.msg == 0 ? "支付失败" : "支付成功";
    // },
    // textStyle() {
    //   return this.$route.params.msg == 0
    //     ? {
    //         color: "#ed4630"
    //       }
    //     : { color: "#5bbc11" };
    // }
  },
  activated() {},
  methods: {
    submitPay() {
      if (this.resultImg) {
        //投资失败重新投资
        console.log(1);
      } else {
        this.$router.push("/my-investment");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.pay-result {
  .header {
    border-bottom: 2px solid #e4c471;
  }
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
  .footer {
    position: fixed;
    box-sizing: border-box;
    bottom: 25px;
    width: 100%;
    padding: 15px;
    .button-style {
      width: 100%;
    }
    .button-bottom {
      width: 100%;
      margin-top: 10px;
    }
  }
}
</style>
