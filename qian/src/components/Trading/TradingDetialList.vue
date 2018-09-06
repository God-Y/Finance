<template>
  <div class="TradingDetialList " >
    <div class="showMoney van-hairline--top-bottom">
      <div>{{list.amount|amount}}</div>
      <div>交易金额（元）</div>
    </div>
    <ul class="product-list">
      <li>
        <div>
          <span class="iconfont icon-chanpinyouhua"></span>
          <span class="pro-item">产品名称</span>
        </div>
        <span class="pro-name">{{list.productName}}</span>
      </li>
      <li>
        <div>
          <span class="iconfont icon-yinhangqia"></span>
          <span class="pro-item">交易方式</span>
        </div>
        <span class="pro-name">{{list.payType}}</span>
      </li>
      <li>
        <div>
          <span class="iconfont icon-zhangdan"></span>
          <span class="pro-item">交易流水</span>
        </div>
        <span class="pro-name">{{list.bankCardId}}</span>
      </li>
      <li>
        <div>
          <span class="iconfont icon-jiankangyunshijian"></span>
          <span class="pro-item"> 交易时间</span>
        </div>
        <span class="pro-name">{{list.gmtCreate|timeSecond}}</span>
      </li>
      <li>
        <div>
          <span class="iconfont icon-Zhuangtai-Xian"></span>
          <span class="pro-item">交易状态 </span> 
        </div>
        <span class="pro-name">{{setStatus(list.status,list.type)}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TradingDetialList",
  props: {
    list: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    setStatus(status, type) {
      if (status == 30) return "回款中";
      if (status == 20 && type == 1) return "回款失败";
      if (status == 20 && type == -1) return "付款失败";
      if (status == 10 && type == 1) return "回款成功";
      if (status == 10 && type == -1) return "付款成功";
    }
  }
};
</script>
<style lang="scss" scoped>
.TradingDetialList {
  background: #fff;
  .showMoney {
    @extend %flex-center-vartical;
    flex-direction: column;
    height: 170px;
    div:first-child {
      color: #dfae61;
      font-size: 20px;
    }
    div:last-child {
      font-size: 15px;
      color: #666;
    }
  }
  .product-list {
    display: flex;
    flex-direction: column;
    height: 201px;
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
        color: #666666;
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
    }
  }
}
</style>
