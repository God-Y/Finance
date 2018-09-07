<template>
  <div class="header-box van-hairline--bottom">
    <img src="@/assets/img/back.png" @click="$router.go(-1)">
    {{title}}
  </div>
</template>
<script>
export default {
  name: "CommonHeader",
  props: {
    title: String
  }
};
</script>
<style lang="scss" scoped>
.header-box {
  position: relative;
  z-index: 1;
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
</style>
