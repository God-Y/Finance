<template>
  <div class="bankcard-manage">
    <common-header title="银行卡管理"></common-header>
    <div class="no-bankCard" v-if="!data.length">
      <img src="@/assets/img/bank/bank.png" alt="" srcset="">
      <p>暂无内容</p>
      <van-button 
        class="button-style" 
        type="warning"
        @click="goAdd"
      >添加银行卡</van-button>
    </div>
    <div v-else class="card-list">
        <div class="card" v-for="item of data" :key='item.id'>
          <div class="logo-box">
            <img :src="item.bankLogo" alt="" class="bank-logo">
          </div>
          <div class="crad-msg">
            <div>
              <div class="card-name">{{item.bankName}}</div>
              <div class="card-type">{{item.cardType}}</div>
            </div>
            <div class="crad-num">
              {{toCard(item.cardNumber)}}
            </div>
          </div>
          <div class="money-num-1">
            <span>单笔限额</span>
            <span class="limit">{{item.singleLimit/10000}}万</span>
          </div>
          <div class="money-num-2">
            <span>日&ensp;限&ensp;额</span>
            <span class="limit">{{item.dailyLimit/10000}}万</span>
          </div>
        </div>
    </div>
    <div class="footer-box">
      <div class="top-title">如需更换银行卡信息请拨打客服电话</div>
      <div class="bottom-title">
        <span class="iconfont icon-lianxikefu"></span>客服电话 
        <a href="tel:400-800-0100" class="tel"> <span>400-800-0100</span></a>
      </div>
      <van-button 
        class="button-style"
        type="warning"
        :disabled="ableUse"
        @click=" goAdd"
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
      data: []
    };
  },
  computed: {
    ableUse() {
      return this.data.length == 2;
    },
    name() {
      return this.$store.state.realName;
    }
  },
  activated() {
    this.getMsg();
  },
  methods: {
    getMsg() {
      this.$api.bank.manageBankCard().then(res => {
        let data = res.data;
        console.log(data);
        if (data.code) {
          this.data = data.data.slice(-1);
        }
      });
    },
    toCard(card) {
      let arr = card.split("");
      return arr
        .map((value, index) => {
          if (index > 3 && index < arr.length - 3) {
            return "*";
          } else {
            return value;
          }
        })
        .join("");
    },
    goAdd() {
      //未实名,跳转到实名认证
      if (!name) {
        this.$toast.fail("未进行实名认证");
        setTimeout(() => {
          this.$router.push("/writeIdInfo");
        }, 500);
        return;
      }
      this.$store.commit("changeCity", "");
      this.$router.push("/add-backCard");
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
  .card-list {
    padding: 0 15px 60px;
    //银行卡
    .card {
      position: relative;
      margin-top: 15px;
      height: 130px;
      padding: 18px 10px 16px 48px;
      background: #3e64ad;
      border-radius: 6px;
    }
    //银行卡盒子
    .logo-box {
      position: absolute;
      left: 10px;
      text-align: center;
      width: 32px;
      line-height: 32px;
      background: #fff;
      border-radius: 50%;
      font-size: 0;
    }
    .bank-logo {
      vertical-align: middle;
      width: 21px;
      height: 21px;
    }
    //银行卡信息
    .crad-msg {
      display: flex;
      justify-content: space-between;
      color: #fff;
      letter-spacing: 2px;
      .card-name {
        font-size: 16px;
      }
      .card-type {
        margin-top: 10px;
        font-size: 12px;
      }
      .crad-num {
        font-size: 14px;
      }
    }
    //限额
    color: #fff;
    .money-num-1 {
      font-size: 13px;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    .limit {
      margin-left: 30px;
    }
  }
  .footer-box {
    position: absolute;
    box-sizing: border-box;
    left: 15px;
    right: 15px;
    bottom: 25px;
    text-align: center;
    color: #999;
    .top-title {
      font-size: 13px;
      margin-bottom: 10px;
    }
    .bottom-title {
      font-size: 13px;
      margin-bottom: 12px;
      .icon-lianxikefu {
        vertical-align: -2px;
        margin-right: 2px;
      }
      a {
        color: #d6b87d;
        margin-left: 10px;
      }
    }
    .button-style {
      width: 100%;
    }
  }
}
</style>
