<template>
  <div class="bankcard-manage">
    <common-header title="添加银行卡"></common-header>
    <add-bank-list :data="list" ></add-bank-list>
    <div class="footer-btn">
      <van-button 
        class="button-style" 
        type="warning"
        @click="addbank"
        :disabled="!submitAble"
      >确认添加</van-button>
    </div>

  </div>
</template>
 
<script>
import CommonHeader from "common/CommonHeader";
import AddBankList from "@/components/Bank/AddBankList";
import { mapState } from "vuex";
export default {
  name: "AddBankCard",
  components: {
    CommonHeader,
    AddBankList
  },
  data() {
    return {
      data: null,
      list: {
        bankName: "",
        bankPhone: "",
        cardNumber: "62"
      }
    };
  },
  computed: {
    ...mapState(["city"]),
    submitAble() {
      let showCity = Boolean(this.city);
      for (let key in this.list) {
        showCity = Boolean(this.list[key]) && showCity;
      }
      return showCity;
    }
  },
  //路由守卫解决一个问题
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    console.log(to, from);
    if (to.name == "backCard-manage") {
      this.list = {
        bankName: "",
        bankPhone: "",
        cardNumber: "62"
      };
    }
    next();
  },
  methods: {
    addbank() {
      if (this.list.bankPhone.length != 11) {
        this.$toast.fail("手机号格式不对");
        return;
      }
      let bankRegexp = /^(\d{16}|\d{19})$/;
      if (!bankRegexp.test(this.list.cardNumber)) {
        this.$toast.fail("银行卡格式不正确");
        return;
      }
      this.list.city = this.city;
      this.$api.bank.addBankCard(this.list).then(res => {
        let data = res.data;
        if (data.code == -1) {
          this.$toast.fail(data.message);
        } else {
          this.$toast.success(data.message);
          this.$router.push("/backCard-manage");
        }
      });
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
  //底部按钮布局
  .footer-btn {
    position: absolute;
    bottom: 30px;
    left: 15px;
    right: 15px;
  }
  .button-style {
    margin-top: 25px;
    width: 100%;
  }
}
</style>
