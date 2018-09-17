<template>
  <div class="help">
    <common-header title="关于我们" class="header"></common-header>
    <div>
      <img :src="data.content" alt="" class="img-box">
    </div>
     
  </div>
</template>
 
<script>
import CommonHeader from "common/CommonHeader";

export default {
  name: "AboutUs",
  components: {
    CommonHeader
  },
  data() {
    return {
      data: null
    };
  },
  created() {
    this.getMsg();
  },
  methods: {
    getMsg() {
      this.$api.set.aboutUs().then(res => {
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
.header {
  position: fixed;
  width: 100%;
}
.img-box {
  margin-top: 50px;
  width: 100%;
}
</style>
