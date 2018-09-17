<template>
  <div class="option">
    <common-header title="意见反馈" class="header"></common-header>
    <textarea name="" id="" class="input-field"
      placeholder="请输入您的宝贵意见，我们将及时改进"
      maxlength="240"
      v-model="value"
    ></textarea>
    <span>{{inputLength}}/240</span>
    <div class="footer-box">
       <van-button 
        class="button-style" 
        type="warning"
        :disabled="!inputLength"
        @click="submitOption"
      >提交</van-button>
    </div>
  </div>
</template>
 
<script>
import CommonHeader from "common/CommonHeader";

export default {
  name: "Option",
  components: {
    CommonHeader
  },
  data() {
    return {
      value: ""
    };
  },
  computed: {
    inputLength() {
      return this.value.length;
    }
  },
  methods: {
    submitOption() {
      this.$api.set.opinion(this.value).then(res => {
        let data = res.data;
        if (data.code) {
          this.$toast(data.message);
          setTimeout(() => {
            this.$router.go(-1);
          }, 500);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.option {
  position: relative;
}
.input-field {
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  box-sizing: border-box;

  border: none;
  min-height: 250px;
}
span {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.footer-box {
  position: fixed;
  box-sizing: border-box;
  padding: 0 15px;
  width: 100%;
  bottom: 25px;
  .button-style {
    width: 100%;
  }
}
</style>
