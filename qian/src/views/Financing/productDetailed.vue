<template>
  <div>
    <div class="linear-gradient">
      <div class="header-box">
        <img src="@/assets/img/productDetailed/back.png" @click="$router.go(-1)">
        <span>{{detailedData.name}}</span>
      </div>
      <div class="line-title">预期年化收益率</div>
      <div class="income">{{detailedData.annualizedIncome | income}}<span>%</span></div>
      <div class="line-style">
        <div class="line-feed">
          <span>理财期限(月)</span>
          <span>{{detailedData.deadline | monthChnage}}</span>
        </div>
        <span class="vertical-line"></span>
        <div class="line-feed">
          <span>起投金额(元)</span>
          <span>{{detailedData.startingAmount | amount}}</span>
        </div>
      </div>
    </div>
    <ul class="content">
      <li class="introduction">
        <span>产品简介</span>
        <span @click="lookMore">查看更多&#12288;></span>
      </li>
      <li>
        <div>
          <img class="repay" src="@/assets/img/productDetailed/repay.png" alt="">
          <span>还款方式</span>
        </div>
        <span>{{detailedData.repaymentMode | repayment}}</span>
      </li>
      <li>
        <div>
          <img class="clock" src="@/assets/img/productDetailed/clock.png" alt="">
          <span>起息日期</span>
        </div>
        <span>{{countDateStart | countTime}}</span>
      </li>
      <li>
        <div>
          <img class="repayway" src="@/assets/img/productDetailed/repayWay.png" alt="">
          <span>回款日期</span>
        </div>
        <span>{{countDateEnd | countTime}}</span>
      </li>
      <li>
        <div>
          <img class="info" src="@/assets/img/productDetailed/info.png" alt="">
          <span>产品备注</span>
        </div>
        <span>{{detailedData.describe}}</span>
      </li>
      <li>
        <div>
          <img class="compact" src="@/assets/img/productDetailed/compact.png" alt="">
          <span>产品合同</span>
        </div>
        <span @click="checkCompact" class="checkCompact">查看合同&#12288;></span>
      </li>
    </ul>
    <van-dialog
      v-model="show"
      confirm-button-text="确定">
      <div class="look-title">查看合同</div>
      <div class="compact-box">
        <div @click="jumpCompact" class="compact-style"><u>《出借咨询与服务协议》</u></div>
        <div class="compact-style">《授权委托书-出借确认和债...》</div>
        <div class="compact-style">《授权委托书-催收及诉讼》</div>
        <div class="compact-style">《出借本金确认书》</div>
      </div>
    </van-dialog>
    <div class="footer">
        <img @click="jumpCount" class="counter" src="@/assets/img/productDetailed/counter.png" alt="">
        <van-button class="button" type="warning">立即投资</van-button>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "productDetailed",
  data() {
    return {
      detailedData: "",
      dateStart: Date.now(), //当前日期
      show: false /* 查看合同 */
    };
  },
  created() {
    this.getDetailed();
  },
  computed: {
    countDateStart() {
      let valueDate = this.detailedData.valueDate;
      switch (valueDate) {
        case 10:
          return this.dateStart;
        case 20:
          return this.dateStart + 1 * 24 * 60 * 60 * 1000;
        case 30:
          return this.dateStart + 2 * 24 * 60 * 60 * 1000;
      }
    }, //计算起息日期
    countDateEnd() {
      let deadline = this.detailedData.deadline;
      return this.dateStart + deadline * 24 * 60 * 60 * 1000;
    } //计算到期日期
  },
  mounted() {},
  methods: {
    getDetailed() {
      let id = this.$route.query.id;
      console.log(id);
      this.$api.commend.getProductDetailed(id).then(res => {
        console.log(res);
        this.detailedData = res.data.data[1];
        console.log(this.detailedData);
      });
    } /* 获取产品详情 */,
    lookMore() {
      let info = this.detailedData.moreDetails;
      console.log(info);
      this.$router.push({
        name: "moreDetailed",
        params: { moreInfo: info }
      });
    } /* 查看更多 */,
    checkCompact() {
      this.show = true;
    } /* 查看合同 */,
    jumpCompact() {
      this.$router.push({
        path: "/compactOne"
      });
    } /* 跳转至合同页面 */,
    jumpCount() {
      let id = this.$route.query.id; /* 产品id */
      this.$router.push({
        path: "/productCount",
        query: { id: id, name: this.detailedData.name }
      });
    } /* 计算页面 */
  }
};
</script>
<style lang="scss" scoped>
.header-box {
  position: relative;
  text-align: center;
  font-size: 17px;
  font-family: PingFang-SC-Medium;
  color: #fff;
  height: 50px;
  line-height: 50px;
  img {
    position: absolute;
    left: 15px;
    width: 15px;
    height: 15px;
    padding: 10px;
    @extend %po-valign;
  }
}
.linear-gradient {
  margin-bottom: 11px;
  background: linear-gradient(to bottom, #d6a956, #ffb12e);
  border-radius: 2px;
} /* 背景色渐变 */
.line-title {
  margin-bottom: 38px;
  color: #fff;
  text-align: center;
  font-family: PingFang-SC-Medium;
  font-size: 13px;
} /* 预期年化收益率 */
.income {
  margin-bottom: 43px;
  text-align: center;
  font-size: 50px;
  font-weight: 100;
  font-family: Helvetica Neue;
  color: #ffffff;
  span {
    font-size: 18px;
    font-family: Helvetica;
  }
} /* 收益百分比 */
.line-style {
  display: flex;
  justify-content: space-between;
  padding: 0 56px 0 56px;
} /* 三栏 */
.line-feed {
  flex-wrap: wrap;
  span {
    display: flex;
    justify-content: center;
    flex-basis: 100%;
  }
  > span:nth-child(1) {
    margin-bottom: 13px;
    font-family: PingFang;
    color: #f9e1b9;
  }
  > span:nth-child(2) {
    margin-bottom: 26px;
    font-size: 17px;
    color: #ffffff;
  }
} /* 换行 */
.vertical-line {
  height: 35px;
  width: 1px;
  opacity: 0.32;
  background: #fff;
} /* 竖线 */
.content {
  margin-bottom: 40px;
  padding-bottom: 22px;
  background: #fff;
  > li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 22px;
    padding: 0 15px;
    div > span {
      margin-left: 11px;
      color: #999;
      font-family: SC-Medium;
      font-size: 14px;
    } /* 字和图标的间距 */
    > span {
      color: #666;
      font-size: 14px;
      font-family: PingFang;
    } /* li 标签内 右边span标签 */
  }
} /* 内容区域 */
.repay {
  width: 13px;
  height: 11px;
}
.clock {
  width: 14px;
  height: 14px;
}
.repayway {
  width: 14px;
  height: 12px;
}
.info {
  width: 14px;
  height: 14px;
}
.compact {
  width: 13px;
  height: 13px;
}
// 上面是img的规格
.introduction {
  margin: 0 !important;
  line-height: 40px;
  border-bottom: 1px solid #e8e8e8;
  > span:nth-child(1) {
    font-size: 14px;
    color: #333;
  }
  > span:nth-child(2) {
    font-size: 12px;
    color: #666;
  }
} /* 产品简介 */
.checkCompact {
  color: #dfa854 !important;
  font-size: 14px !important;
} /* 查看合同 */
.counter {
  width: 49px;
  height: 44px;
} /* 计算器 */
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
}
.button {
  margin-left: 7px;
  width: 100%;
  font-size: 17px;
  font-family: SC-Medium;
  color: #fff;
  background: linear-gradient(to bottom, #d6a956, #cca64e);
  border: none;
}
.look-title {
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #333;
  font-size: 17px;
  background: #e6e6e6;
} /* 弹窗标题 */
.compact-box {
  padding: 32px 43px;
} /* 合同列表 */
.compact-style {
  display: flex;
  align-items: center;
  margin-bottom: 19px;
  width: auto;
  height: auto;
  font-size: 14px;
}
.compact-style:active {
  color: #e8c763;
}
.compact-style:active::before {
  background: #e8c763;
}
.compact-style:nth-child(1) {
  color: #e8c763;
}
.compact-style:last-child {
  margin: 0;
}
.compact-style::before {
  content: "";
  display: inline-block;
  margin-right: 12px;
  width: 7px;
  height: 7px;
  background: #c0c0c0;
  border-radius: 50%;
}
.compact-style:nth-child(1)::before {
  background: #e8c763;
}
</style>
