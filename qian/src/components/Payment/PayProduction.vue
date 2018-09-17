<template>
  <div class="pay-production">
    <div class="production-name">{{data.name}}</div>
    <img src="@/assets/img/user/new.png" class="new" v-if="showNew">
    <div class="list-content">
      <div class="list-box ">
        <span class="year">{{data.annualizedIncome*100|amount}}</span>
        <span class="item-footer">预期年化 （%）</span>
      </div>
      <div class="list-box van-hairline--left">
        <span>{{day}}</span>
        <span class="item-footer">理财期限 （{{trueDate}}）</span>
      </div>
      <div class="list-box van-hairline--left">
        <span class="invest-money">{{data.startingAmount|amountInteger}}  </span>
        <span class="item-footer">起头金额 （元）</span>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "PayProduction",
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    day() {
      //确定理财期限是月还是日
      let day = this.data.deadline;
      return day < 30 ? day : (day / 30).toFixed(1);
    },
    trueDate() {
      //确定理财期限的单位
      let day = this.data.deadline;
      return day < 30 ? "日" : "月";
    },
    showNew() {
      return this.data.name === "新手投资计划";
    }
  }
};
</script>
<style lang="scss" scoped>
//启动页
.pay-production {
  position: relative;
  margin-top: 10px;
  background: #fff;
  .production-name {
    padding: 15px 22px;
    font-size: 14px;
    color: #333;
  }
  .new {
    position: absolute;
    top: 0;
    right: 20px;
    width: 22px;
  }
  .list-content {
    display: flex;
    padding-bottom: 18px;
    .list-box {
      flex: 1;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      span:first-of-type {
        font-size: 24px;
        color: #404b5f;
      }
      .year {
        color: #e8c763 !important;
        font-size: 24px;
      }
      .item-footer {
        margin-top: 9px;
        color: #666;
        font-size: 12px;
      }
    }
  }
}
</style>
