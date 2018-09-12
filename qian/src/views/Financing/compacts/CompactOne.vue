<template>
  <div>
    <div class="header-box van-hairline--bottom">
      <img src="@/assets/img/back.png" @click="back">
      <slot name="title">合同详情</slot>
    </div>
    <router-view></router-view>
  </div>
</template>
 
<script>
import commenHeader from "common/CommonHeader.vue";
export default {
  name: "compactOne",
  components: {
    commenHeader
  },
  data() {
    return {};
  },
  created() {},
  computed: {},
  mounted() {},
  methods: {
    back() {
      sessionStorage.removeItem("url");
      this.$router.go(-1);
    }
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
// .header-style {
//   border-bottom: 1px solid #d9d9d9;
// }
</style>
