<template>
  <div>
    <div class="header-box">
      <img src="@/assets/img/back.png" @click="$router.go(-1)">
      <span>查看更多</span>
    </div>
    <img class="info" :src=info alt="">
  </div>
</template>
 
<script>
export default {
  name: "moreDetailed",
  data() {
    return {
      info: ""
    };
  },
  created() {
    this.info = this.$route.params.moreInfo;
    console.log(this.info); /* 获取储存在路由中的图片 地址； */
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.header-box {
  position: relative;
  text-align: center;
  font-size: 17px;
  background: #fff;
  color: $header-color;
  line-height: 50px;
  img {
    position: absolute;
    left: 15px;
    width: 15px;
    height: 15px;
    padding: 10px;
    @extend %po-valign;
  }
}
.info {
  max-width: 100%;
  max-height: 100%;
}
</style>
