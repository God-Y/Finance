<template>
  <div class="pay-bankcard" @click="showAddBank">
    <div class="add-card" v-if="!showBank"> 
      <div class="add-icon"></div>
      <div class="card-msg">
        <strong class="card-num">添加银行卡</strong>
        <div class="card-tip">持卡人需与投保人一致</div>
      </div>
      <span class="iconfont icon-jiantouyou"></span>  
    </div>
    <div class="card-list" v-if="showBank"> 
        <img :src="data.bankLogo" >
        <div class="bank-box">
          <div class="card-name">
            <strong>{{data.bankName}}</strong>
            <span>(尾号{{lastBankNum(data.cardNumber)}})</span>
          </div>
          <p class="limit">单笔限额{{data.singleLimit/10000}}万元，单日限额{{data.dailyLimit/10000}}万元</p>
        </div>
         <span class="iconfont icon-jiantouyou"></span>  
      </div>
  </div>
</template>
 
<script>
export default {
  name: "PayBankcard",
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    showBank() {
      return Object.keys(this.data).length > 0;
    }
  },
  data() {
    return {};
  },
  methods: {
    showAddBank() {
      this.$parent.showAddBank();
    },
    lastBankNum(card) {
      return card.slice(-4);
    }
  }
};
</script>
<style lang="scss" scoped>
//启动页
.pay-bankcard {
  margin-top: 10px;
  height: 90px;
  background: #fff;
  padding: 0 15px;
  .add-card {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    .card-msg {
      flex: 1;
      margin-left: 12px;
      .card-num {
        color: #333;
        font-size: 16px;
        letter-spacing: 1px;
        margin-bottom: 10px;
      }
      .card-tip {
        font-size: 12px;
        color: #999;
      }
    }
    .img-icon {
      width: 38px;
      height: 38px;
    }
    .add-icon {
      position: relative;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: 2px solid #cccccc;
      &::before,
      &::after {
        content: "";
        @extend %po-center;
        width: 3px;
        height: 24px;
        background: #ccc;
      }
      &::after {
        width: 24px;
        height: 3px;
      }
    }
  }
  .icon-jiantouyou {
    font-size: 18px;
    color: #ccc;
  }
  .card-list {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    padding-left: 15px;
    img {
      width: 36px;
      height: 36px;
      margin-right: 12px;
    }
    .bank-box {
      flex: 1;
    }
    .card-name {
      strong {
        font-size: 16px;
        color: #333;
      }
      span {
        color: #999;
        font-size: 14px;
      }
      margin-bottom: 5px;
    }
    .limit {
      margin: 0;
    }
  }
}
</style>
