<template>
  <div class="MyInvestment">
    <div class="header van-hairline--bottom">我的投资</div>
    <swiper :swiper-title="swiperTitle"></swiper> 
    <common-footer></common-footer>  
  </div>
</template>
 
<script>
import CommonFooter from "common/CommonFooter";
import swiper from "@/components/Investment/InvestmentSwiper.vue";

export default {
  name: "MyInvestment",
  components: {
    CommonFooter,
    swiper
  },
  data() {
    return {
      swiperTitle: [
        { name: "理财中", id: 0 },
        { name: "回款中", id: 1 },
        { name: "已回款", id: 2 }
      ]
    };
  },
  computed: {},
  created() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.MyInvestment {
  padding-bottom: 60px;
  .header {
    line-height: 48px;
    text-align: center;
    color: #e8c763;
    font-size: 18px;
    background: #fff;
  }
}
</style>
