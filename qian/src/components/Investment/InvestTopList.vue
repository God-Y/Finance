<template>
  <div class="InvestTopList" v-if="data">
    <div class="List-top">
      <div>预期收益（元）</div> 
      <div>{{data.expectedIncome|amount}}</div>
    </div>
    <div class="list-content">
      <div class="year">
        <span>年化收益率</span>
        <span>{{data.annualizedIncome*100|amount}}%</span>
      </div>
      <div>
        <span>投资本金（元）</span>
        <span>{{data.startingAmount|amount}}</span>
      </div>
    </div>
    <div class="list-footer">
      <span>起息：{{data.valueDateStart|time}}</span>
      <span>到息：{{data.valueDateEnd|time}}</span>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "InvestTopList",
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>
<style lang="scss" scoped>
//启动页
.InvestTopList {
  color: #fff;
  background: linear-gradient(
    164deg,
    rgba(209, 169, 94, 1),
    rgba(247, 179, 68, 0.81)
  );
  padding-top: 48px;
  .List-top {
    margin-top: 44px;
    text-align: center;
    div:first-child {
      font-size: 14px;
    }
    div:last-child {
      font-size: 30px;
      margin-top: 15px;
      margin-bottom: 20px;
    }
  }
  .list-content {
    display: flex;
    margin-bottom: 24px;
    .year {
      border-right: 1px solid #fff;
    }
    & > div {
      flex: 1;
      text-align: center;
      span {
        display: block;
        &:first-child {
          margin-bottom: 10px;
          font-size: 12px;
        }
        &:last-child {
          font-size: 15px;
        }
      }
    }
  }
  .list-footer {
    display: flex;
    background: #d9a95b;
    line-height: 31px;
    span {
      flex: 1;
      font-size: 12px;
      text-align: center;
    }
  }
}
</style>
