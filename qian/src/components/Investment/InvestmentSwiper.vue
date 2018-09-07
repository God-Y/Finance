
<template>
<div>
    <div class="swiper-header">
      <span 
        v-for="item in swiperTitle" 
        :key="item.id"
        @click="slideTo(item.id)"
        :class="[item.id > 1 ? 'van-hairline--left':'',swiperIndex === item.id?'active':'']"
      >{{item.name}}</span>
    </div>
    <swiper :options=" contentSwiperOption" ref="ContentSwiper" class="swiper-box">
      <swiper-slide class="item">
        <investmenting></investmenting>
      </swiper-slide>
      <swiper-slide class="item">
        <return-moneying></return-moneying>
      </swiper-slide>
      <swiper-slide class="item">
        <return-moneyed></return-moneyed>
      </swiper-slide>
    </swiper>
</div>
</template>
 
<script>
import Investmenting from "./Investmenting";
import ReturnMoneyed from "./ReturnMoneyed";
import ReturnMoneying from "./ReturnMoneyIng";
export default {
  name: "carrousel",
  components: {
    Investmenting,
    ReturnMoneying,
    ReturnMoneyed
  },
  props: {
    swiperTitle: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      contentSwiperOption: {
        observer: true,
        observeParents: true,
        on: {
          slideChangeTransitionEnd: () => {
            this.swiperIndex = this.ContentSwiper.activeIndex; //切换结束时，告诉我现在是第几个slide
          }
        }
      },
      swiperIndex: 0
    };
  },
  computed: {
    ContentSwiper() {
      return this.$refs.ContentSwiper.swiper;
    }
  },
  mounted() {},
  methods: {
    slideTo(index) {
      this.ContentSwiper.slideTo(index, 1000, false);
      this.swiperIndex = index;
    }
  }
};
</script>
<style lang="scss" scoped>
//标题
.swiper-header {
  display: flex;
  color: #999999;
  font-size: 14px;
  text-align: center;
  background: #fff;
  span {
    flex: 1;
    line-height: 40px;
    border-bottom: 2px solid transparent;
  }
}
.swiper-box {
  height: 80vh;
}
//启动页
.item {
  height: initial !important;
}

.active {
  color: #e8c763;
  border-color: #e8c763 !important;
}
</style>
