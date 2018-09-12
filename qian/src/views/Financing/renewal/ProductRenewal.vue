<template>
  <div>
    <commenHeader title="产品续投"></commenHeader>
    <main class="main-box">
      <div class="info-box">
        <p>新手体验计划</p>
        <ul>
          <li>
            <span>{{productData.annualizedIncome | income}}</span>
            <span>预期年化（%）</span>
          </li>
          <li>
            <span>{{amountDate}}</span>
            <span>理财期限（月）</span>
          </li>
          <li>
            <span>{{productData.startingAmount | amount}}</span>
            <span>起投金额（元）</span>
          </li>
        </ul>
      </div>
      <div class="incomeInfo-box">
        <ul class="date-style">
          <li>
            <span>起息日期</span>
            <span>{{productData.valueDateStart | countTime}}</span>
          </li>
          <li class="vertical-line"></li>
          <li>
            <span>到期日期</span>
            <span>{{productData.valueDateEnd | countTime}}</span>
          </li>
        </ul>
        <p class="income-num">{{productData.expectedIncome | amount}}</p>
        <p class="income-title">预期收益</p>
      </div>
      <div class="bank-info">
        <span>回款至</span>
        <span class="bank-select">{{productData.bankName}}<span>（尾号{{ productData.bankCardNumber | tailNum}}）</span></span>
      </div>
      <div class="select-compact">
        <van-checkbox class="check-content" v-model="checked">
          本人已认真阅读并同意
        </van-checkbox>
        <a @click="lookCompact">《xxxxxxx协议》</a>
      </div>
      <p class="describe">
        <span>备注：</span>
        续投会在投资到期时将投资本金自动转入下次投资中，利息照常回款。
      </p>
      <div class="button-box">
        <p>投资本金<span>¥ {{productData.investmentAmount | amount}}</span></p>
        <van-button @click="confirm" class="button" type="warning">确定</van-button>
      </div>
    </main>
  </div>
</template>
 
<script>
import commenHeader from "common/CommonHeader.vue";
export default {
  components: {
    commenHeader
  },
  data() {
    return {
      checked: true,
      productData: ""
    };
  },
  activated() {},
  created() {
    this.productInfo();
  },
  computed: {
    amountDate() {
      return (
        Math.abs(
          this.productData.valueDateEnd - this.productData.valueDateStart
        ) /
        86400000 /
        30
      ).toFixed(0);
    } /* 计算理财期限 */
  },
  mounted() {},
  methods: {
    productInfo() {
      let id = this.$route.query.id;
      this.$api.commend.renewalData(id).then(res => {
        console.log(res);
        this.productData = res.data.data[1];
        console.log(this.productData);
      });
    } /* 获取续投产品信息 */,
    lookCompact() {
      this.$router.push({
        path: "/compactOne"
      });
    } /* 查看合同 */,
    confirm() {
      let id = this.$route.query.id;
      this.$router.push({
        path: "/compactOne",
        query: { id: id, status: "renewal" }
      });
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
.main-box {
  padding-top: 10px;
  p {
    margin: 0;
  }
}
$width: 100%/3;
.info-box {
  margin-bottom: 10px;
  padding: 15px 27px 15px 17px;
  background: #fff;
  & > p {
    margin-bottom: 16px;
    font-size: 14px;
    color: #333;
  }
  & > ul {
    display: flex;
    justify-content: space-between;
    li {
      display: flex;
      flex-wrap: wrap;
      flex-basis: $width;
      span {
        flex-basis: 100%;
      }
      & > span:nth-child(1) {
        margin-bottom: 11px;
        line-height: 35px;
      }
      & > span:nth-child(2) {
        font-size: 12px;
        color: #666666;
        white-space: nowrap;
      }
    } /* 公共样式 */
    & > li:nth-child(1) {
      & > span:nth-child(1) {
        font-size: 24px;
        font-family: Helvetica;
        color: #e5c56b;
      }
    } /* 第一个li标签 */
    & > li:nth-child(2) {
      text-align: center;
      border-left: 1px solid #e8e8e8;
      border-right: 1px solid #e8e8e8;
      & > span:nth-child(1) {
        color: #414c5d;
        font-size: 17px;
        font-family: Helvetica;
      }
    } /* 第二个li标签 */
    & > li:nth-child(3) {
      text-align: right;
      & > span:nth-child(1) {
        color: #414c5d;
        font-size: 17px;
        font-family: Helvetica;
      }
    } /* 第三个li标签 */
  }
}
.incomeInfo-box {
  margin-bottom: 10px;
  background: #fff;
}
.vertical-line {
  width: 1px;
  height: 30px;
  background: #e8e8e8;
}
.date-style {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 67px 20px 67px;
  border-bottom: 1px solid #e8e8e8;
  & > li {
    display: flex;
    flex-wrap: wrap;
    & > span {
      flex-basis: 100%;
      text-align: center;
    }
    & > span:nth-child(1) {
      margin-bottom: 15px;
      font-size: 15px;
      color: #666;
    }
    & > span:nth-child(2) {
      font-size: 13px;
      color: #999;
    }
  }
}
.income-num {
  margin-top: 10px !important;
  margin-bottom: 12px !important;
  text-align: center;
  font-size: 20px;
  color: #dfae61;
}
.income-title {
  padding-bottom: 10px !important;
  text-align: center;
  color: #666;
  font-size: 15px;
}
.bank-info {
  display: flex;
  justify-content: space-between;
  padding: 20px 15px;
  margin-bottom: 15px;
  background: #fff;
  & > span:nth-child(1) {
    font-size: 14px;
    color: #999;
  }
}
.bank-select {
  font-size: 14px;
  color: #666;
  span {
    color: #999;
  }
}
.select-compact {
  display: flex;
  align-items: center;
  padding-left: 15px;
  margin-bottom: 69px;
  a {
    color: #0da8ff;
  }
}
.check-content {
  font-size: 12px;
  color: #666;
}
.describe {
  padding: 0 37px 0 15px;
  font-size: 12px;
  color: #999999;
  span {
    color: #666;
  }
}
.button-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  padding: 8px 15px;
  background: #fff;
  > p {
    vertical-align: middle;
    font-size: 15px;
    color: #666;
    > span {
      margin-left: 10px;
      color: #d7a863;
    }
  }
}
.button {
  width: 100px;
  height: 44px;
}
</style>
