<template>
  <div>
     <div class="header-box van-hairline--bottom">
      <img src="@/assets/img/back.png" @click="back">
      账户设置
    </div>
    <router-view></router-view>
  </div>
</template>
 
<script>
import commenHeader from "common/CommonHeader.vue";
export default {
  name: "accountSetting",
  components: {
    commenHeader
  },
  data() {
    return {};
  },
  created() {
    this.getInfo();
  },
  computed: {},
  mounted() {},
  methods: {
    getInfo() {
      this.$api.setting.getSetting().then(res => {
        console.log(res);
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
