<template>
  <div>
    <div class="add-bankcard">
      <ul>
        <li>
          <span class="left-item van-hairline--right">姓&emsp;&emsp;名</span>
          <span class="right-item">{{userName}}</span>  
        </li>
        <li>
          <span class="left-item van-hairline--right">身份证号</span>
          <span class="right-item">{{userId}}</span>
        </li>
        <li>
          <span class="left-item van-hairline--right">城&emsp;&emsp;市</span>
          <input 
            type="text" 
            class="input-item"
            v-model="city" 
            placeholder="选择城市"
            @click="$router.push('/search-city')"
          >
          <span class="iconfont icon-jiantouyou"></span>
        </li>
        <li>
          <span class="left-item van-hairline--right">开&ensp;户&ensp;行</span>
          <input 
            type="text" 
            class="input-item" 
            v-model="data.bankName" 
            placeholder="选择开户行"
            @click="selectBank"
          >
          <span class="iconfont icon-jiantouyou"></span>
        </li>
        <li>
          <span class="left-item van-hairline--right">银行卡号</span>
          <input 
            type="text" 
            class="input-item" 
            v-model="data.cardNumber" 
            placeholder="选择持卡人银行账户"
            @input="checkBankId(data.cardNumber)"
            maxlength="19"
          >
        </li>
        <li>
          <span class="left-item van-hairline--right" >预留手机</span>
          <input 
            type="text" 
            class="input-item" 
            v-model="data.bankPhone" 
            maxlength="11" 
            placeholder="输入银行预留手机号"
            @input ="checkPhone(data.bankPhone)"
          >
        </li>
      </ul>
    </div>
    <common-dialog v-if="showDialog" @hide="hide" @getbank="getbank"></common-dialog>
  </div>

</template>
 
<script>
import CommonDialog from "common/CommonDialog.vue";
export default {
  name: "AddBankList",
  components: {
    CommonDialog
  },
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      showDialog: false //设置布尔值，用来确定对话框是否隐藏
    };
  },
  computed: {
    city() {
      //获取city
      return this.$store.state.city;
    },
    userName() {
      return this.$store.getters.userMsg.idName;
    },
    userId() {
      return this.$store.getters.userMsg.idNumber;
    }
  },
  methods: {
    selectBank() {
      //选择银行卡
      this.showDialog = true;
    },
    hide() {
      //隐藏银行卡
      this.showDialog = false;
    },
    getbank(value) {
      //获取银行卡的名称
      this.data.bankName = value;
    },
    //检测银行卡只能输入数字
    checkBankId(value) {
      this.data.cardNumber = value.replace(/\D/, "");
    },
    //检测手机号
    checkPhone(value) {
      this.data.bankPhone = value.replace(/\D/, "");
      //手机号码第一位应该不为0
      if (value.length === 1 && value === "0") {
        this.data.bankPhone = "";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.add-bankcard {
  margin-top: 11px;
  background: #fff;
  li {
    display: flex;
    align-items: center;
    height: 60px;
    .left-item {
      color: #333333;
      padding: 0 15px;
    }
    .right-item {
      margin-left: 15px;
      font-size: 14px;
      color: #999;
    }
    [class*="van-hairline"]::after {
      border-color: rgba($color: #000000, $alpha: 0.3);
    }
    .icon-jiantouyou {
      margin-right: 15px;
      position: absolute;
      right: 0;
    }
    .input-item {
      flex: 1;
      margin-left: 15px;
      height: 80%;
      border: none;
      font-size: 13px;
    }
  }
}
</style>
