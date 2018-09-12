<template>
  <div class="start-box">
  <transition name="fade-guide" v-if="guideShow">
    <img src="@/assets/img/guide.png" class="guide-img">
  </transition>
  <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
    <!-- slides -->
    <swiper-slide><img src="@/assets/img/start1.png" alt="" class="slide-img"></swiper-slide>
    <swiper-slide><img src="@/assets/img/start2.png" alt="" class="slide-img"></swiper-slide>
    <swiper-slide><img src="@/assets/img/start3.png" alt="" class="slide-img"></swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
    <div class="swiper-scrollbar"   slot="scrollbar"></div>
  </swiper>
  <van-button size="large" class="go-btn" type="warning" @click="go" v-if="goBtnShow">立即进入</van-button>
  </div>
</template>
 
<script>
export default {
  name: "startPage",
  data() {
    return {
      swiperOption: {
        observer: true,
        observeParents: true,
        pagination: {
          el: ".swiper-pagination"
        },
        on: {
          //设置函数让其在最后一张轮播的时候显示按钮
          slideChangeTransitionStart: () => {
            if (this.swiper.activeIndex === 2) {
              this.goBtnShow = true;
            } else {
              this.goBtnShow = false;
            }
          }
        }
      },
      index: 0,
      guideShow: true,
      goBtnShow: false
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    this.guideShow = false;
  },
  methods: {
    callback() {
      console.log(1);
    },
    go() {
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="scss" scoped>
//启动页
.guide-img {
  position: absolute;
  width: 100%;
  left: 0;
  z-index: 10;
}
//轮播
.slide-img {
  width: 100%;
}
.swiper-pagination {
  margin-bottom: 80px;
}
.go-btn {
  width: 80%;
  position: absolute;
  z-index: 1;
  background: #409eff;
  color: #fff;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
