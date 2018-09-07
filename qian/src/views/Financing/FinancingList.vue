<template>
  <div class="box">
     <header class="header-style">
      <span>理财列表</span>
    </header>
    <van-tabs @change="change" color="#e8c763" v-model="active" swipeable>
      <van-tab class="content"  :title="'产品列表'">
        <router-view></router-view>
      </van-tab>
      <van-tab class="content"  :title="'产品续投'">
        <router-view></router-view>
      </van-tab>
    </van-tabs>
    <footerCommon></footerCommon>
  </div>
</template>
 
<script>
import footerCommon from "common/CommonFooter.vue";
export default {
  name: "dinancingList",
  components: {
    footerCommon
  },
  data() {
    return {
      active: ""
    };
  },
  created() {},
  computed: {},
  mounted() {},
  methods: {
    change(index) {
      switch (index) {
        case 0:
          this.$router.push({
            path: "/financingList/productList"
          }); /* 产品列表 */
          break;
        case 1:
          this.$router.push({
            path: "/financingList/addList"
          }); /* 产品续投列表 */
          break;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  background: #f0f0f0;
}
.header-style {
  line-height: 50px;
  font-size: 19px;
  text-align: center;
  color: #e8c763;
  background: #fff;
  border-bottom: 1px solid #d9d9d9;
}
.content {
  padding-bottom: 15px;
}
</style>
