<template>
  <div class="city-list" ref="wrapper">
    <div  class="wrapper">
      <ul>
        <li 
          v-for="(value,keys) of cities" 
          :key="keys"
          :ref='keys'
        >
          <div class="area">
            <div 
              class="title van-hairline--bottom"
            >{{keys}}</div>
            <ul class="item-list" v-for="item of value" :key="item.id">
              <li 
                class="item van-hairline--bottom"
                @click="setCity(item.name)"
              >{{item.name}}</li>
            </ul>
          </div>
        </li>
      </ul> 
      </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";

export default {
  name: "SearchCityList",
  props: {
    cities: Object,
    letter: String
  },
  data() {
    return {};
  },
  watch: {
    letter() {
      //通过$ref来获取的具体的元素。注意下拉列表选取后腰有[0]
      const ele = this.$refs[this.letter][0];
      if (this.letter) {
        //调用better-scroll的方法，跳转到具体元素
        this.scroll.scrollToElement(ele, 1000);
      }
    }
  },
  mounted() {
    if (!this.scroll) {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true
        });
      });
    } else {
      //存在的刷新整个scroll
      this.scroll.refresh();
    }
  },
  activated() {
    if (this.scroll) {
      this.scroll.refresh();
    }
  },
  methods: {
    setCity(value) {
      //通过点击事件来往store仓库传递一个值，用来改变城市
      this.$store.commit("changeCity", value);
      this.scroll.scrollTo(0, 0); //保证页面再次进入正常渲染数据
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.city-list {
  position: absolute;
  top: 110px;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  overflow: hidden;
  .title {
    line-height: 30px;
    padding-left: 15px;
    background: #eee;
    color: #666;
  }
  [class*="van-hairline"]::after {
    border-color: rgba($color: #000000, $alpha: 0.4);
  }
  ul {
    .item {
      line-height: 40px;
      padding-left: 15px;
      font-size: 16px;
      color: #666;
    }
  }
}
</style>
