<template>
  <div class="bankcard-manage">
    <common-header title="银行卡管理"></common-header>
    <div class="no-bankCard">
      <img src="@/assets/img/bank/bank.png" alt="" srcset="">
      <p>暂无内容</p>
      <van-button 
        class="button-style" 
        type="warning"
        @click="$router.push('/add-backCard')"
      >添加银行卡</van-button>
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
.bankcard-manage {
  .no-bankCard {
    margin-top: 127px;
    text-align: center;
    img {
      width: 124px;
    }
    p {
      color: #666666;
      font-size: 14px;
    }
    .button-style {
      margin-top: 25px;
      width: 50%;
    }
  }
}
</style>
