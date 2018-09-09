<template>
  <div>
    <CommonScrool
    class="list-box"
    @pullingUp="pullingUp"
    @pullingDown="pullingDown" 
    :data='productList' 
    :dirty="dirty"
    >
      <div class="product-box">
        <div @click="jumpDetailed(temp.id)" class="product" v-for="temp of productList" :key="temp.index">
          <p class="product-title">{{temp.name}}</p>
          <div class="line-style">
            <div>
              <span class="income">{{temp.annualizedIncome  | income}}</span>
              <span>预期年化&#12288;(%)</span>
            </div>
            <div>
              <span class="font-style">{{temp.deadline | monthChnage}}</span>
              <span class="line-two">理财期限&#12288;(
                <span v-if="temp.deadline!= 7">月</span>
                <span v-if="temp.deadline == 7">日</span>)</span>
            </div>
            <div>
              <span class="font-style">{{temp.startingAmount | amount}}</span>
              <span class="line-two">起投金额&#12288;(元)</span>
            </div>
          </div>
        </div>
      </div>
    </CommonScrool>
  </div>
</template>

<script>
import CommonScrool from "common/CommonScrool";

export default {
  name: "productList",
  components: {
    CommonScrool
  },
  data() {
    return {
      productList: [],
      getPage: {
        pageNum: 1,
        pageSize: 10
      },
      dirty: true,
      pageTotal: 0 /* page总数 */
    };
  },
  created() {
    this.getList(this.getPage);
  },
  computed: {},
  mounted() {},
  methods: {
    getList(data) {
      this.$api.commend.getProductList(data).then(res => {
        console.log(res);
        this.productList = res.data.data.list;
        this.pageTotal = res.data.data.pages;
      });
    } /* 获取产品列表 */,
    pullingDown() {
      this.getPage.pageNum = 1;
      this.getList(this.getPage);
    } /* 刷新数据 */,

    pullingUp() {
      this.getPage.pageNum += 1;
      console.log(this.getPage);
      console.log(this.pageTotal);
      console.log(this.getPage.pageNum <= this.pageTotal);
      if (this.getPage.pageNum <= this.pageTotal) {
        this.$api.commend.getProductList(this.getPage).then(res => {
          console.log(res);
          console.log(res.data.data.list);
          this.productList = this.productList.concat(res.data.data.list);
        });
      } else {
        this.productList = this.productList.slice(0);
        this.dirty = false;
      }
    } /* 上拉刷新 */,
    jumpDetailed(id) {
      console.log(id);
      this.$router.push({
        path: "/productDetailed",
        query: { id: id }
      });
    } /* 跳转至产品详情路由 */
  }
};
</script>
<style lang="scss" scoped>
.list-box {
  margin-bottom: 60px;
  height: 76.5vh;
}
.product-box {
  padding-top: 15px;
}
.product {
  height: 125px;
  background: #fff;
  margin-top: 15px;
}
.product:nth-child(1) {
  margin-top: 0;
}
.product-title {
  color: #333;
  font-size: 16px;
  margin: 0;
  box-sizing: border-box;
  padding: 10px 0 10px 15px;
  font-family: PingFang-SC-Medium;
}
$line-width: 100%/3;
.line-style {
  padding: 0 32px 0 17px;
  display: flex;
  justify-content: space-between;
  & > div {
    display: flex;
    width: $line-width;
    flex-wrap: wrap;
    > span {
      display: flex;
      flex-basis: 100%;
      align-items: flex-end;
    }
    > span:nth-child(1) {
      margin-bottom: 14px;
    }
    > span:nth-child(2) {
      color: #666;
      font-size: 13px;
      font-family: PingFang-SC-Medium;
    } /* 预期年化那一行 */
  }
  > div:nth-child(1) {
    box-sizing: border-box;
    border-right: 1px solid #e8e8e8;
  }
  > div:nth-child(3) {
    box-sizing: border-box;
    border-left: 1px solid #e8e8e8;
  }
}
.income {
  height: 35px;
  color: #e8c763;
  font-size: 24px;
}
.font-style {
  height: 35px;
  justify-content: center;
  color: #404b5f;
  font-size: 17px;
}
.line-two {
  justify-content: center;
}
</style>
