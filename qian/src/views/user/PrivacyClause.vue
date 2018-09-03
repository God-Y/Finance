<template>
  <div class="procotol-box">
    <common-header title="隐私条款"></common-header>
    <main-content></main-content>
    <div class="footer">
      <van-button type="warning" class="submit-btn" @click = "$router.go(-1)" >返回</van-button>
    </div>
  </div>

</template>
 
<script>
import CommonHeader from "common/CommonHeader";
import MainContent from "@/components/Login/protocol";
// import { mapState } from "vuex";
export default {
  name: "PrivasyClause",
  components: {
    CommonHeader,
    MainContent
  }
};
</script>
<style lang="scss" scoped>
//启动页
.procotol-box {
  background-color: #fff;
  .footer {
    position: fixed;
    box-sizing: border-box;
    width: 100%;
    padding: 0 20px;
    .submit-btn {
      width: 100%;
      color: #fff;
    }
  }
}
</style>
