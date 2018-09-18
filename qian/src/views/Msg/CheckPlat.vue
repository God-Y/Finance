<template>
  <div class="CheckMsgImg">
    <common-header :title="data.title"></common-header>
    <div><img :src="data.content"></div>
  </div>
</template>
 
<script>
import CommonHeader from "common/CommonHeader";

export default {
  name: "CheckMsgImg",
  components: {
    CommonHeader
  },
  data() {
    return {
      data: null
    };
  },
  activated() {
    this.getMsg();
  },
  methods: {
    getMsg() {
      let ID = this.$route.params.id;
      this.$api.message.getImgMsg(ID).then(res => {
        let data = res.data;
        if (data.code) {
          this.data = data.data;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.CheckMsgImg {
  // background: red;
  img {
    width: 100%;
  }
}
</style>
