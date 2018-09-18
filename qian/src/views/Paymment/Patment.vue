<template>
  <div class="bankcard-manage">
    <common-header title="投资金额"></common-header>
    <pay-production :data = "data"></pay-production>
    <pay-bank-card :data = "selectList"></pay-bank-card>
    <pay-input @submitMoney = "submitMoney"></pay-input>
    <van-checkbox v-model="checked" class="allow">
      本人已认真阅读并同意
      <span 
        class="prototel"
        @click="$router.push('/user-protocol')"
      >《出借合同与服务协议》</span>
    </van-checkbox>
    <footer class="footer">
      <span>
        本次共需支付
        <span class="show-money">￥ {{submitData.amount|amount}}</span>
      </span>
       <van-button 
        class="button-style" 
        type="warning"
        @click="submitPay"
        :disabled ="!submitBtnUse"    
      >确定</van-button>
    </footer>
    <pay-dialog 
      v-show="dialogShow" 
      :list="cardList"
      @hide="hideAddBank"
      @selectCard="selectCard"
    ></pay-dialog>
  </div>
</template>
 
<script>
import CommonHeader from "common/CommonHeader";
import PayProduction from "@/components/Payment/PayProduction";
import PayBankCard from "@/components/Payment/PayBankCard";
import PayDialog from "@/components/Payment/PayDialog";
import PayInput from "@/components/Payment/PayInput";

export default {
  name: "Payment",
  components: {
    CommonHeader,
    PayProduction,
    PayBankCard,
    PayDialog,
    PayInput
  },
  data() {
    return {
      dialogShow: false,
      data: {},
      cardList: [],
      selectList: {},
      submitData: {
        userBankId: "",
        amount: 0
      },
      checked: true
    };
  },
  computed: {
    //获取相关页面的id
    ID() {
      return this.$route.params.id;
    },
    //判断按钮能否点击
    submitBtnUse() {
      return (
        this.checked && this.submitData.userBankId && this.submitData.amount
      );
    }
  },
  activated() {
    this.getMsg(this.ID);
    this.getBankCards();
  },
  methods: {
    getMsg(ID) {
      this.$api.commend.getProductDetailed(ID).then(res => {
        let data = res.data;
        if (data.code) {
          this.data = data.data[1];
        }
      });
    },
    getBankCards() {
      this.$api.bank.manageBankCard().then(res => {
        let data = res.data;
        if (data.code) {
          this.cardList = data.data;
        }
      });
    },
    //隐藏显示的银行卡
    hideAddBank() {
      this.dialogShow = false;
    },
    //显示添加银行卡
    showAddBank() {
      // alert(1)
      console.log(1);
      this.dialogShow = true;
    },
    //选中银行卡
    selectCard(value) {
      this.selectList = value;
      this.submitData.userBankId = value.id;
    },
    //显示钱数
    submitMoney(value) {
      this.submitData.amount = value;
    },
    submitPay() {
      if (
        this.submitData.amount < 10000 ||
        !Number.isInteger(~~this.submitData.amount)
      ) {
        this.$toast.fail("投资金额格式不正确");
      } else {
        this.submitData.productId = this.$route.params.id;
        localStorage.setItem("payment", JSON.stringify(this.submitData));
        console.log(this.submitData);
        this.$router.push({
          path: "/compactOne",
          query: { status: "payment" }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.bankcard-manage {
  // background: red;
  padding-bottom: 60px;
  .allow {
    margin-top: 10px;
    padding-left: 15px;
    color: #666666;
    .prototel {
      color: #0da8ff;
    }
  }
  .footer {
    position: fixed;
    flex-wrap: wrap;
    box-sizing: border-box;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    width: 100%;
    background: #fff;
    span {
      font-size: 15px;
    }
    .show-money {
      color: #ff8855;
    }
  }
}
</style>
