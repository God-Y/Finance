<template>
  <div class="box-style">
    <div class="count-date">
      <div class="count-date-line line-border">
        <span>起息日期</span>
        <span>2016.11.07</span>
      </div>
      <div class="count-date-line">
        <span>到期日期</span>
        <span>2017.11.08</span>
      </div>
    </div>
    <div class="count-box">
      <p>{{income}}</p>
      <p>预期收益 <span>（元）</span></p>
      <p>本计算器不考虑节假日延期，试算结果仅供参考</p>
    </div>
    <div class="count-detailed">
      <div class="count-detailed-title">
        <span>付息日期</span>
        <span>付息金额</span>
      </div>
      <ul class="month-box">
        <li v-for="item of incomeList" :key="item.index" class="month-style">
          <span>{{item.executeTime | countTime}}</span>
          <span>¥ {{item.paybackAmount | amount}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "countTwo",
  data() {
    return {
      amountData: {},
      income: "",
      incomeList: {}
    };
  },
  activated() {
    // this.amountData.amount = this.$route.query.amount;
    // this.amountData.productId = this.$route.query.id;
    // this.$api.commend.getIncome(this.amountData).then(res => {
    //   this.income = res.data.data.expectIncome; /* 获取收益金额 */
    //   this.incomeList = res.data.data.list;
    //   console.log(this.income);
    //   console.log(this.incomeList);
    // });
  },
  created() {
    this.amountData.amount = this.$route.query.amount;
    this.amountData.productId = this.$route.query.id;
    this.$api.commend.getIncome(this.amountData).then(res => {
      console.log(res);
      this.income = res.data.data.expectIncome; /* 获取收益金额 */
      this.incomeList = res.data.data.list;
      console.log(this.income);
      console.log(this.incomeList);
    });
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.box-style {
  background: #fff;
}
.count-date {
  display: flex;
  padding: 41px 85px;
  border-bottom: 1px solid #d9d9d9;
}
.count-date-line {
  display: flex;
  flex-wrap: wrap;
  & > span {
    display: flex;
    justify-content: center;
    flex-basis: 100%;
  }
  & > span:nth-child(1) {
    margin-bottom: 15px;
    font-size: 15px;
    color: #666;
  }
  & > span:nth-child(2) {
    color: #999;
    font-size: 13px;
  }
} /* 起息日期-到期日期 */
.line-border {
  border-right: 1px solid #d9d9d9;
} /* 竖线 */
.count-box {
  padding: 0 0 12px 15px;
  p {
    margin: 0;
  }
  & > p:nth-child(1) {
    margin: 39px 0 7px 0;
    text-align: center;
    font-size: 20px;
    color: #dfae61;
  }
  & > p:nth-child(2) {
    margin-bottom: 40px;
    text-align: center;
    font-size: 15px;
    color: #666666;
    span {
      color: #999999;
    }
  }
  & > p:nth-child(3) {
    color: #999999;
    font-size: 12px;
  }
} /* 预期收益 */
.count-detailed-title {
  display: flex;
  justify-content: space-between;
  padding: 18px 15px;
  background: #f5f5f5;
  & > span {
    font-size: 15px;
    color: #333;
  }
}
.month-box {
  height: 39vh;
  overflow: auto;
}
.month-style {
  padding: 22px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
  & > span:nth-child(1) {
    font-size: 14px;
    color: #999;
    font-family: PingFang-SC-Medium;
  }
  > span:nth-child(2) {
    color: #dfae61;
    font-size: 14px;
  }
}
</style>
