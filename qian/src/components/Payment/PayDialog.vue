<template>
  <div class="common-footer" @click="hideDialog">
    <div class="footer-box">
      <div class="title">
        选择支付方式
        <i class="close-icon" @click="hideDialog"></i>
      </div>
      <div class="card-list" v-for="item of list" :key ='item.id' @click="selectCard(item)"> 
        <img :src="item.bankLogo" >
        <div>
          <div class="card-name">
            <strong>{{item.bankName}}</strong>
            <span>(尾号{{lastBankNum(item.cardNumber)}})</span>
          </div>
          <p class="limit">单笔限额{{item.singleLimit/10000}}万元，单日限额{{item.dailyLimit/10000}}万元</p>
        </div>
      </div>
      <!-- 银行卡小于二张的时候，可以跳转去添加银行卡 -->
      <div class="to-add-list" v-if="showNewAdd" @click.stop="$router.push('/add-backCard')">
        <div class="add-icon"></div>
        <div class="add-new">添加新银行卡</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PayDialog",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    showNewAdd() {
      return this.list.length < 2;
    }
  },
  methods: {
    lastBankNum(card) {
      return card.slice(-4);
    },
    hideDialog() {
      this.$emit("hide");
    },
    selectCard(value) {
      this.$emit("selectCard", value);
    }
  }
};
</script>
<style lang="scss" scoped>
.common-footer {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.3);
  .footer-box {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: #fff;
  }
  .title {
    position: relative;
    line-height: 50px;
    font-size: 16px;
    text-align: center;
    .close-icon {
      top: 45%;
      transform: translateY(-50%);
      right: 15px;
      position: absolute;
      width: 18px;
      height: 18px;
      &::before,
      &::after {
        content: "";
        position: absolute;
        width: 18px;
        height: 2px;
        left: 50%;
        top: 50%;
        background: #b8b8b8;
      }
      &::before {
        transform: translate(-50%, -50%) rotate(45deg);
      }
      &::after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }
  }
  //银行卡列表
  .card-list {
    display: flex;
    height: 60px;
    align-items: center;
    padding-left: 15px;
    img {
      width: 36px;
      height: 36px;
      margin-right: 12px;
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
    }
    .limit {
      margin: 0;
    }
  }
  .to-add-list {
    display: flex;
    position: relative;
    align-items: center;
    height: 60px;
    padding-left: 15px;
    .add-icon {
      position: relative;
      width: 36px;
      height: 36px;
      margin-right: 12px;
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
    .add-new {
      color: #666;
      letter-spacing: 2px;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
