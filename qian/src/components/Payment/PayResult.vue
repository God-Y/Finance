<template>
  <div class="pay-result">
    <common-header title="支付结果"></common-header>
    <pay-production></pay-production>
  </div>
</template>
 
<script>
import CommonHeader from "common/CommonHeader";
import PayProduction from "@/components/Payment/PayProduction";

export default {
  name: "MyInvestment",
  components: {
    CommonHeader,
    PayProduction
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
.pay-result {
  background: red;
}
</style>
