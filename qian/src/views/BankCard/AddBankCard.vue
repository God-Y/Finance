<template>
  <div class="bankcard-manage">
    <common-header title="添加银行卡"></common-header>
    <add-bank-list></add-bank-list>
  </div>
</template>
 
<script>
import CommonHeader from "common/CommonHeader";
import AddBankList from "@/components/Bank/AddBankList";

export default {
  name: "AddBankCard",
  components: {
    CommonHeader,
    AddBankList
  },
  data() {
    return {
      data: null
    };
  },
  activated() {},
  methods: {}
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
}
</style>
