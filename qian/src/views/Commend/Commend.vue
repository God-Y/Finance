<template>
  <div>
    <header class="header-style">
      <span>精品推荐</span>
      <img class="bell" src="../../assets/img/CommendImg/bell.png">
    </header>
    <div class="carousel-box">
       <swiper :options="swiperOption">
          <swiper-slide v-for="item of carousel" :key="item.index"><img class="img-style" :src="item.cover" ></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "Commend",
  data() {
    return {
      carousel: "" /* 轮播图 */,
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  created() {
    this.getImg();
    this.getProduct();
  },
  computed: {},
  mounted() {},
  methods: {
    getImg() {
      this.$api.commend.GetCommendImg().then(res => {
        this.carousel = res.data.data;
      });
    } /* 获取轮播图 */,
    getProduct() {
      this.$api.commend.productCommend().then(res => {
        console.log(res);
      });
    } /* 获取推荐产品 */
  }
};
</script>
<style lang="scss" scoped>
.header-style {
  position: relative;
  @extend %flex--center-vartical;
  line-height: 50px;
  & > span {
    color: #e8c763;
    font-size: 19px;
  }
  & > img {
    position: absolute;
    right: 16px;
    width: 18px;
    height: 20px;
  }
} /* 页眉 */
.carousel-box {
  display: flex;
  max-height: 150px;
  .img-style {
    max-width: 100%;
  }
}
</style>
