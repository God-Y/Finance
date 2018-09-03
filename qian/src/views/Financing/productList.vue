<template>
  <div>
    <van-list
    v-model="loading"
    :finished="finished"
    @load="onLoad"
    :offset="10"
    :immediate-check= false
    >
      <div>
        <div @click="jumpDetailed(temp.id)" class="product" v-for="temp of productList" :key="temp.index">
          <p class="product-title">{{temp.name}}</p>
          <div class="line-style">
            <div>
              <span class="income">{{temp.annualizedIncome}}</span>
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
    </van-list>
  </div>
</template>

<script>
export default {
  name: "productList",
  data() {
    return {
      productList: [],
      loading: false,
      finished: false,
      getPage: {
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  created() {
    this.getList("");
  },
  computed: {},
  mounted() {},
  methods: {
    onLoad() {
      console.log("load");
      this.getPage.pageNum += 1;
      console.log(this.getPage.pageNum);
      setTimeout(() => {
        this.loading = false;
        this.getList(this.getPage);
        // this.finished = true;
      }, 500);
    },
    getList(data) {
      this.$api.commend.getProductList(data).then(res => {
        console.log(res);
        let list = res.data.data.list;
        this.productList = this.productList.concat(list);
        console.log(this.productList);
      });
    } /* 获取产品列表 */,
    jumpDetailed(id) {
      console.log(id);
    }
  }
};
</script>
<style lang="scss" scoped>
.product {
  height: 125px;
  background: #fff;
  margin-top: 15px;
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
