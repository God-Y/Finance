<template>
  <div class="payInput" >
    <label for="money">金&emsp;额</label>
    <input 
      type="text" 
      id="money" 
      v-model="money"
      placeholder="请输入10000的整数倍金额"
      @input="inputMoney(money)"
    >

  </div>
</template>
<script>
export default {
  name: "PayInput",
  data() {
    return {
      money: ""
    };
  },
  computed: {},
  methods: {
    inputMoney(value) {
      this.money = value.replace(/\D/g, "");
      this.$emit("submitMoney", value);
    }
  }
};
</script>
<style lang="scss" scoped>
.payInput {
  margin-top: 10px;
  padding-left: 15px;
  line-height: 60px;
  background: #ffffff;
  .money {
    height: 100%;
  }
  input {
    font-size: 12px;
    width: 80%;
    padding-left: 18px;
    border: none;
  }
}
</style>
