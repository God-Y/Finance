<template>
  <div>
    <header class="header-style">
      <span>精品推荐</span>
      <img @click="jumpMessage" class="bell" src="../../assets/img/CommendImg/bell.png">
    </header>
    <div class="carousel-box">
       <swiper v-if="carousel.length>0" :options="swiperOption">
          <swiper-slide v-for="item of carousel" :key="item.index"><img @click="bannerDetalied(item.id, item.cover, item.title)" class="img-style" :src="item.cover" ></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <main>
      <div class="main-title">
        <p>{{productName}}</p>
        <div class="badge-box">
          <span class="badge"><span>新</span></span>
          <span class="badge-two"><span>热</span></span>
        </div>
      </div>
      <div class="product-box">
        <carousel-3d @after-slide-change="changeSlide" v-if="products.length>0" dir="ltr" :space="280" height=206 :border=0 :perspective="0" :display="3">
          <slide v-for="(item, i) in products" :index="i" :key="item.index">
              <productCanvas :color=color :products=item :id="i+1"></productCanvas>
          </slide>
        </carousel-3d>
      </div>
      <div class="button-box">
        <van-button @click="invest" class="button-style" type="warning">立即投资</van-button>
      </div>
    </main>
    <footer>
      <common-footer></common-footer>
    </footer>
  </div>
</template>
 
<script>
import productCanvas from "../../components/common/ProductCanvas.vue";
import commonFooter from "../../components/common/CommonFooter.vue";
export default {
  components: {
    productCanvas,
    commonFooter
  },
  name: "Commend",
  data() {
    return {
      carousel: [] /* 轮播图 */,
      products: "" /* 产品推荐 */,
      productName: "",
      color: "#CCA64E" /* 传递给canvas？ */,
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 300,
        autoplay: {
          delay: 5000
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        } /* 分页 */,
        id: ""
      }
    };
  },
  created() {
    this.checkLogin();
    this.getImg();
    this.getProduct();
  },
  computed: {},
  mounted() {},
  methods: {
    bannerDetalied(banner, cover, title) {
      console.log(banner);
      this.$router.push({
        path: "/bannerDetailed",
        query: { id: banner, cover: cover, title: title }
      });
    }, //点击banner 获取详情
    changeSlide(index) {
      console.log(this.products[index]);
      this.productName = this.products[index].name;
      this.id = this.products[index].id;
      console.log(this.productName);
    } /* 3d滑动的callback，获取index值 */,
    getImg() {
      this.$api.commend.GetCommendImg().then(res => {
        console.log(res);
        this.carousel = res.data.data;
      });
    } /* 获取轮播图 */,
    getProduct() {
      this.$api.commend.productCommend().then(res => {
        this.products = res.data.data;
        console.log(this.products[0]);
        this.productName = this.products[0].name;
      });
    } /* 获取推荐产品 */,
    checkLogin() {
      this.$api.common.checklogin().then(res => {
        console.log(res);
      });
    }, ///判断是否登录，但是这个接口暂时用不上
    jumpMessage() {
      this.$router.push({
        path: "/message"
      });
    }, //跳转至消息中心
    invest() {
      console.log(this.id);
      this.$router.push({
        path: "/productDetailed",
        query: { id: this.id }
      });
    } //跳转至产品详情页
  }
};
</script>
<style lang="scss" scoped>
.header-style {
  position: relative;
  background: #fff;
  @extend %flex-center-vartical;
  line-height: 50px;
  border-bottom: 1px solid #e8e8e8;
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
  margin-bottom: 10px;
  max-height: 150px;
  background: #fff;
  .img-style {
    max-width: 100%;
  }
} /* 轮播 */
@mixin badge-style {
  display: inline-block;
  margin-left: 5px;
  text-align: center;
  width: 22px;
  height: 30px;
  font-size: 9px;
  color: #fff;
  background-size: cover;
  span {
    display: inline-block;
    margin: 2px;
  }
} /* 徽章 */
.main-title {
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid #e8e8e8;
  & > p {
    margin: 0 0 0 30px;
    font-size: 16px;
    color: #333333;
  }
  .badge-box {
    position: absolute;
    top: 0;
    right: 15px;
  }
  .badge {
    background: url(../../assets/img/CommendImg/badgeOne.png) no-repeat;
    @include badge-style();
  }
  .badge-two {
    background: url(../../assets/img/CommendImg/badgeTwo.png) no-repeat;
    @include badge-style();
  } /* 徽章 */
}
main {
  height: 64vh;
  background: #fff;
}
.product-box {
  height: 294px;
} /* 产品推荐图 */
.carousel-3d-container {
  margin: 27px 0 60px 0;
  .carousel-3d-slide {
    margin: 0;
    width: auto !important;
    height: auto !important;
    background: #fff;
  }
} /* 3D轮播 */
.button-box {
  padding: 0 15px;
  margin-bottom: 7px;
} /* button盒子 */
.button-style {
  width: 100%;
} /* button样式 */
</style>
