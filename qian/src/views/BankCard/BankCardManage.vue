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
        <div class="card" v-for="item of data" :key='item.id' @click="defaultCard(item.id)" :style="cardBgColor(item.bankName)">
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
            <span class="limit">{{item.singleLimit/10000}} 万</span>
          </div>
          <div class="money-num-2">
            <span>日&ensp;限&ensp;额&ensp;</span>
            <span class="limit">{{item.dailyLimit/10000}} 万</span>
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
          <van-button 
            class="go-commend"
            type="warning"
            :disabled="!goUse"
            @click="$router.push('/financingList')"
          >去投资</van-button>
        </div>
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
      data: [],
      defaultClick: false
    };
  },
  computed: {
    ableUse() {
      return this.data.length == 2;
    },
    name() {
      return this.$store.getters.real;
    },
    //去推荐页
    goUse() {
      return this.data.length > 0;
    }
  },
  activated() {
    this.getMsg();
    this.getUser();
  },
  methods: {
    getUser() {
      this.$api.me.getMsg().then(res => {
        let data = res.data;
        if (data.code) {
          //这里写入对象
          this.$store.commit("getUser", data.data);
        }
      });
    },
    getMsg() {
      this.$api.bank.manageBankCard().then(res => {
        let data = res.data;
        if (data.code) {
          this.data = data.data;
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
      if (!this.name) {
        this.$toast.fail("未进行实名认证");
        setTimeout(() => {
          this.$router.push("/writeIdInfo");
        }, 500);
        return;
      }
      this.$store.commit("changeCity", "");
      this.$router.push("/add-backCard");
    },

    //设置默认银行卡
    defaultCard(id) {
      this.$dialog
        .confirm({
          message: "设置该卡为默认银行卡"
        })
        .then(() => {
          this.$api.setting.defaultCard(id).then(res => {
            let data = res.data;
            if (data.code == 1) {
              this.$toast.success(data.message);
              setTimeout(() => {
                this.$router.push("/me");
              }, 1000);
            }
          });
        })
        .catch(() => {
          this.$toast("取消操作");
        });
    },
    cardBgColor(name) {
      switch (name) {
        case "工商银行":
          return { backgroundColor: "#C40006" };
        case "农业银行":
          return { backgroundColor: "#319C8B" };
        default:
          return { backgroundColor: "#3e64ad" };
      }
    }
  }
};
</script>
<style lang="scss" scoped>
// C40006
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
      padding: 18px 10px 0px 48px;
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
    bottom: 10px;
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
    .go-commend {
      width: 100%;
      margin-top: 10px;
    }
  }
}
</style>
