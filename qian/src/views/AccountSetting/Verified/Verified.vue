<template>
  <div class="box">
    <commenHeader class="header-style" title="身份审核"></commenHeader>
    <div class="content-box">
      <div class="photo-box">
        <img class="verified" src="@/assets/img/verify/verified.png" alt="">
      </div>
      <p class="content-title">资料已提交成功</p>
      <p class="p-style">审核时间在两小时之内，请耐心等待</p>
      <p class="p-style">工作时间为9:00-18:00</p>
      <div class="button-box">
        <van-button disabled @click="addBankCard" class="button-style" type="warning">添加银行卡</van-button>
        <van-button @click="back" class="button-style" type="primary" plain>返回</van-button>
      </div>
    </div>
  </div>
</template>
 
<script>
import { Dialog } from "vant";
import commenHeader from "common/CommonHeader.vue";
export default {
  name: "verify",
  components: {
    commenHeader,
    Dialog
  },
  data() {
    return {};
  },
  activated() {},
  created() {},
  computed: {},
  mounted() {},
  methods: {
    addBankCard() {
      this.$router.push({
        path: "/add-backCard"
      });
    },
    back() {
      this.$router.push({
        path: "/me"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  position: relative;
}
.content-box {
  height: 93vh;
  background: #fff;
}
.photo-box {
  padding-top: 92px;
  text-align: center;
}
.verified {
  width: 92px;
  height: 96px;
}
.content-title {
  font-size: 15px;
  text-align: center;
  color: #51b433;
}
.p-style {
  font-size: 13px;
  text-align: center;
  color: #666;
}
.button-box {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 25px;
  display: flex;
  flex-wrap: wrap;
  padding: 0 15px;
  background: #fff;
}
.button-style {
  margin-top: 5px;
  width: 100%;
}
</style>
