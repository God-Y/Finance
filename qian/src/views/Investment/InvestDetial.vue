<template>
  <div class="InvestmentDetial">
    <header class="invest-header van-hairline--bottom">
      <span class="iconfont icon-zuojiantou" @click="$router.go(-1)"></span>
      <span v-if="data">{{data.name}}</span>
    </header>
    <invest-top-list :data="data"></invest-top-list>
    <Invest-middle-list :list='data'></Invest-middle-list>
    <div class="button-box">
      <van-button class="button-style" type="warning">立即投资</van-button>
    </div>
  </div>
</template>
 
<script>
import CommonHeader from "common/CommonHeader";
import InvestTopList from "@/components/Investment/InvestTopList";
import InvestMiddleList from "@/components/Investment/InvestMiddleList";

export default {
  name: "MyInvestment",
  components: {
    CommonHeader,
    InvestTopList,
    InvestMiddleList
  },
  data() {
    return {
      data: null
    };
  },
  activated() {
    this.getMsg();
  },
  methods: {
    getMsg() {
      let ID = this.$route.params.id;
      this.$api.invest.investDetial(ID).then(res => {
        let data = res.data;
        console.log(data);
        if (data.code) {
          this.data = data.data;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.InvestmentDetial {
  .invest-header {
    position: fixed;
    width: 100%;
    background: #d2a556;
    color: #fff;
    line-height: 48px;
    text-align: center;
    font-size: 18px;
    .icon-zuojiantou {
      position: absolute;
      left: 15px;
      font-size: 25px;
    }
  }
  [class*="van-hairline"]::after {
    border-color: #fff;
  }
  .button-box {
    margin-top: 20px;
    padding: 0 15px;
    .button-style {
      width: 100%;
    }
  }
}
</style>
