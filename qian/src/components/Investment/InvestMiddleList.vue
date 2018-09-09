<template>
  <div class="InvestMideleList" v-if="list">
     <ul class="product-list">
      <li>
        <div>
          <span class="iconfont icon-chanpinyouhua"></span>
          <span class="pro-item">产 品 合 同 </span>
        </div>
        <span class="check-contract">查看合同
          <i class="iconfont icon-jiantouyou"></i>
        </span>
      </li>
      <li>
        <div>
          <span class="iconfont icon-licai"></span>
          <span class="pro-item">还 款 方 式 </span>
        </div>
        <span class="pro-name">{{returnMoney}}</span>
      </li>
      <li>
        <div>
          <span class="iconfont icon-yinhangqia"></span>
          <span class="pro-item">回 款 账 户 </span>
        </div>
        <span class="pro-name">{{backAccount}}</span>
      </li>
      <li>
        <div>
          <span class="iconfont icon-zhangdan"></span>
          <span class="pro-item">起 投 金 额 </span>
        </div>
        <span class="pro-name money">￥ {{list.startingAmount|amount}}</span>
      </li>
      <li>
        <div>
          <span class="iconfont icon-licai-copy"></span>
          <span class="pro-item"> 投 资 状 态 </span>
        </div>
        <span class="pro-name">{{investStatus}}</span>
      </li>
      <li>
        <div>
          <span class="iconfont icon-Zhuangtai-Xian"></span>
          <span class="pro-item">未分配收益 </span> 
        </div>
        <span class="pro-name  money">￥ {{(list.expectedIncome-list.distributedIncome)|amount}}</span>
      </li>
      <li>
        <div>
          <span class="iconfont icon-iconfonttouzi"></span>
          <span class="pro-item ">已分配收益</span> 
        </div>
        <span class="pro-name money">￥ {{list.distributedIncome|amount}}</span>
      </li>
    </ul>
  </div>
</template>
 
<script>
export default {
  name: "InvestMiddleList",
  props: {
    list: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    backAccount() {
      let num = this.list.bankCardNumber.slice(-4);
      return this.list.bankName + `（尾号${num} )`;
    },
    returnMoney() {
      return this.list.repaymentMode === 20
        ? "按月还息，到期还本"
        : "到期一次付清";
    },
    investStatus() {
      switch (this.list.investmentStatus) {
        case 10:
          return "理财中";
        case 20:
          return "回款中";
        case 30:
          return "已回款";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
//启动页
.InvestMideleList {
  margin-top: 10px;
  .product-list {
    display: flex;
    flex-direction: column;
    height: 300px;
    background: #fff;
    li {
      flex: 1;
      display: flex;
      padding: 0 17px;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      .pro-item {
        color: #999999;
      }
      .pro-name {
        font-size: 15px;
      }
      .money {
        color: #d9a95d;
      }
      .check-contract {
        color: #d9a95d;
        font-size: 14px;
        .iconfont {
          width: initial;
          margin: 0;
        }
      }
      .iconfont {
        display: inline-block;
        width: 30px;
        text-align: center;
        color: #c8a556;
        margin-right: 12px;
        margin-left: -10px;
      }
      .icon-chanpinyouhua {
        font-size: 20px;
      }
      .icon-licai {
        font-size: 22px;
      }
      .icon-zhangdan {
        font-size: 20px;
      }
      .icon-Zhuangtai-Xian {
        font-size: 20px;
      }
      .icon-jiankangyunshijian {
        font-size: 20px;
        margin-right: 9px;
      }
      .icon-licai-copy {
        font-size: 20px;
        margin-right: 9px;
      }
      .icon-iconfonttouzi {
        font-size: 22px;
      }
    }
  }
}
</style>
