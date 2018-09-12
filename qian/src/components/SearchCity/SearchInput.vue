<template>
  <div>
    <div class="search-input van-hairline--bottom" >
      <span class="iconfont icon-sousuo"></span>
        <input type="text" v-model="keyword" placeholder="输入城市名或拼音">
    </div>
    <div
      class="search-content" 
      :style="[!showList?noSearchList:'']"
      ref='search' 
      v-show="keyword"
    >
      <ul>
        <li 
          v-for="item of list" 
          :key="item.id"
          class="search-item van-hairline--bottom"
          v-show="showList"
          @click ="setCity(item.name)"
        >{{item.name}}</li>
        <li  v-show="!showList">
          <common-nocontent title="搜索的城市不存在"></common-nocontent>
        </li>
      </ul>
     
    </div>
  </div>
</template>
<script>
import Bscroll from "better-scroll";
import CommonNocontent from "common/CommonNoContent";
export default {
  name: "SearchInput",
  props: {
    cities: Object
  },
  components: {
    CommonNocontent
  },
  data() {
    return {
      list: [],
      keyword: "",
      noSearchList: {
        background: "#fff"
      }
    };
  },
  activated() {
    //调用这个钩子保证搜索城市列表是空的
    this.keyword = "";
  },
  computed: {
    showList() {
      return this.list.length > 0;
    }
  },
  mounted() {
    if (!this.scrool) {
      this.scrool = new Bscroll(this.$refs.search, {
        click: true
      });
    } else {
      this.scrool.refresh();
    }
  },
  watch: {
    keyword(newValue) {
      let keyword = newValue.toLowerCase();
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (this.keyword == "") {
        this.list = [];
        return;
      }
      const result = [];
      for (let item of Object.values(this.cities)) {
        item.forEach(value => {
          if (value.name.includes(keyword) || value.spell.includes(keyword)) {
            result.push(value);
          }
        });
      }
      this.list = result;
    }
  },
  methods: {
    setCity(value) {
      //通过点击事件来往store仓库传递一个值，用来改变城市
      this.$store.commit("changeCity", value);
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.search-input {
  margin-top: 10px;
  padding: 0 15px 10px;
  [class*="van-hairline"]::after {
    border-color: rgba($color: #000000, $alpha: 0.4);
  }
  .icon-sousuo {
    position: absolute;
    margin-top: 12px;
    margin-left: 5px;
  }
  input {
    font-size: 12px;
    border-radius: 2px;
    border: none;
    box-sizing: border-box;
    width: 100%;
    line-height: 40px;
    padding-left: 30px;
    background: #eee;
  }
}
.search-content {
  position: absolute;
  top: 110px;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: #d8d8d8;
  [class*="van-hairline"]::after {
    border-color: rgba($color: #000000, $alpha: 0.4);
  }
  .search-item {
    background: #fff;
    line-height: 40px;
    padding-left: 15px;
    font-size: 16px;
    color: #666;
  }
}
</style>
