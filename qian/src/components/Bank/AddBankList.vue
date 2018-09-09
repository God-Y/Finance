<template>
  <div class="add-bankcard">
    <ul>
      <li>
        <span class="left-item van-hairline--right">姓&emsp;&emsp;名</span>
      </li>
      <li>
        <span class="left-item van-hairline--right">身份证号</span>
      </li>
      <li>
        <span class="left-item van-hairline--right">城&emsp;&emsp;市</span>
      </li>
      <li>
        <span class="left-item van-hairline--right">开&ensp;户&ensp;行</span>
      </li>
      <li>
        <span class="left-item van-hairline--right">银行卡号</span>
        <input type="text" class="input-item">
      </li>
      <li>
        <span class="left-item van-hairline--right" >预留手机</span>
        <input type="text" class="input-item" maxlength="11">
      </li>
    </ul>
    <common-dialog></common-dialog>
  </div>
</template>
 
<script>
import CommonDialog from "common/CommonDialog.vue";
export default {
  name: "AddBankList",
  components: {
    CommonDialog
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
    [class*="van-hairline"]::after {
      border-color: rgba($color: #000000, $alpha: 0.3);
    }
    .input-item {
      flex: 1;
      margin-left: 15px;
      padding-left: 15px;
      height: 80%;
      border: none;
      font-size: 13px;
    }
  }
}
</style>
