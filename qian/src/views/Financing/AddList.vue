<template>
  <div>
    <div v-if="productList.length">
      <CommonScrool
      class="list-box"
      @pullingUp="pullingUp"
      @pullingDown="pullingDown" 
      :data='productList' 
      :dirty="dirty"
      >
      <div class="product-box">
        <div @click="jumpDetailed(temp.id)" class="product" v-for="temp of productList" :key="temp.index">
          <p class="product-title">新手体验计划</p>
          <div class="line-style">
            <div>
              <span class="income">{{temp.annualizedIncome  | income}}</span>
              <span>预期年化&#12288;(%)</span>
            </div>
            <div>
              <span class="font-style">{{temp.startingAmount | amount}}</span>
              <span class="line-two">起投金额&#12288;(元)</span>
            </div>
          </div>
          <p class="date-section">{{temp.valueDateStart | countTime}}起息 - {{temp.valueDateEnd | countTime}}到期</p>
        </div>
      </div>
      </CommonScrool>
    </div>
    <div v-else class="content-box">
      <div>
        <img class="blank-photo" src="@/assets/img/productDetailed/blankPhoto.png" alt="">
      </div>
      <div>暂无可续投产品，赶紧投资吧！</div>
      <div>
        <van-button class="button-style" type="warning">立即投资</van-button>
      </div>
    </div>
  </div>
</template>
 
<script>
import CommonScrool from "common/CommonScrool";

export default {
  name: "addList",
  components: {
    CommonScrool
  },
  data() {
    return {
      active: "",
      pageData: {
        pageNum: 1,
        pageSize: 10
      },
      productList: [] /* 数据列表 */,
      dirty: true,
      pageTotal: 0 /* page总数 */
    };
  },
  created() {
    this.getRenewal();
  },
  computed: {},
  mounted() {},
  methods: {
    getRenewal() {
      this.$api.commend.getRenewalProducts(this.pageData).then(res => {
        console.log(res);
        if (res.data.code) {
          this.pageTotal = res.data.data.pages;
          this.dirty = true;
          this.productList = res.data.data.list;
          console.log(this.productList.length);
        }
        // }
      });
    } /* 获取续投列表 */,
    pullingDown() {
      this.pageData.pageNum = 1;
      this.getRenewal();
    } /* 刷新数据 */,
    pullingUp() {
      this.pageData.pageNum++;
      console.log(this.pageData.pageNum);
      console.log(this.pageTotal);
      if (this.pageData.pageNum <= this.pageTotal) {
        this.$api.commend.getRenewalProducts(this.pageData).then(res => {
          this.productList = this.productList.concat(res.data.data.list);
        });
      } else {
        this.productList = this.productList.slice(0);
        this.dirty = false;
      }
    } /* 上拉刷新 */,
    jumpDetailed(id) {
      this.$router.push({
        path: "/renewalDetailed",
        query: { id: id }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.content-box {
  & > div {
    text-align: center;
  }
  & > div:nth-child(1) {
    margin: 77px 0 15px 0;
  }
  & > div:nth-child(2) {
    margin-bottom: 7px;
    color: #666666;
    font-size: 13px;
  }
} /*  */
.blank-photo {
  width: 123px;
  height: 124px;
} /* 续投图片 */
.button-style {
  width: 162px;
  background: #cca64e;
  border: none;
} /* 立即投资按钮 */
.list-box {
  margin-bottom: 60px;
  height: 76.5vh;
}
.product-box {
  padding-top: 15px;
}
.product {
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
  margin-bottom: 20px;
  padding: 0 32px 0 17px;
  display: flex;
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
  > div:nth-child(2) {
    box-sizing: border-box;
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
.date-section {
  margin: 0;
  padding: 10px 0 10px 15px;
  color: #999999;
  font-size: 12px;
  border-top: 1px solid #e8e8e8;
}
</style>
