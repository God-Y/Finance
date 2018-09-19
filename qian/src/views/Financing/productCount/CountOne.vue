<template>
  <div>
    <div class="count-content">
      <div class="invest-date">
        <img class="calendar" src="@/assets/img/productDetailed/calendar.png" alt="日历">
        <span class="sample">投资日期</span>
        <span @click="lookPicker" class="lookPicker">{{countDateStart | countTime}}</span>
      </div>
      <van-datetime-picker
        class="datetime-picker"
        v-if="pickerShow"
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        @cancel="cancel"
        @confirm="confirm"
      />
      <div class="count-date">
        <div class="count-date-line line-border">
          <span>起息日期</span>
          <span>{{countDateStart | countTime}}</span>
        </div>
        <div class="count-date-line">
          <span>到期日期</span>
          <span>{{countDateEnd | countTime}}</span>
        </div>
      </div>
      <div class="count-box">
        <div class="sum-title">
          <img class="money-icon" src="@/assets/img/productDetailed/money.png" alt="">
          <span>投资金额</span>
          <span>（元）</span>
        </div>
        <div class="input-box">
            <van-field v-model="amountData.amount" class="sum-input" input-align="center" />
        </div>
        <div class="button-box">
          <van-button @click="countAmount" class="button-style" type="warning">计算</van-button>
        </div>
      </div>
    </div>
    <div class="remark">
      备注：计算结果仅供参考
    </div>
    <div v-if="incomeShow" class="income">
      <div class="income-title">
        <span>预期收益</span>
        <span>（元）</span>
      </div>
      <span class="income-detailed">{{income}}元</span>
    </div>
  </div>
</template>
 
<script>
import commenHeader from "common/CommonHeader.vue";
export default {
  name: "countOne",
  components: {
    commenHeader
  },
  data() {
    return {
      pickerShow: false /* 日历控件是否显示 */,
      currentDate: new Date() /* 选择日期 */,
      minDate: new Date() /* 最小选择日期 */,

      detailedData: "", //产品详情
      dateStart: Date.now(), //当前日期
      amountData: {
        amount: 50000, //输入金额
        productId: ""
      },
      incomeShow: false,
      income: "" //收益金额
    };
  },
  activated() {
    console.log("acticated");
    this.getDetailed();
    this.init();
  },
  created() {
    console.log("created");
    this.getDetailed();
    this.init();
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
    init() {
      this.income = 0;
      this.incomeShow = false;
    },
    lookPicker() {
      this.pickerShow = !this.pickerShow;
    } /* 查看日历 */,
    cancel() {
      this.pickerShow = !this.pickerShow;
    } /* 日历点击取消 */,
    getDetailed() {
      let id = this.$route.query.id; /* 产品id */
      this.$api.commend.getProductDetailed(id).then(res => {
        console.log(res);
        this.detailedData = res.data.data[1];
        console.log(this.detailedData);
      });
    }, //获取产品详情

    countAmount() {
      this.amountData.productId = this.$route.query.id; /* 产品id */
      this.$api.commend.getIncome(this.amountData).then(res => {
        if (this.detailedData.repaymentMode == 10) {
          //本息一次收
          console.log(res);
          this.incomeShow = true;
          this.income = res.data.data.expectIncome; /* 获取收益金额 */
        } else {
          this.$router.push({
            path: "/productCount/conutTwo",
            query: {
              name: this.$route.query.name,
              id: this.$route.query.id,
              amount: this.amountData.amount
            }
          });
        }
      });
    } //计算按钮
  },
  watch: {
    // sum(newvalue) {
    //   if (isNaN(parseFloat(newvalue.replace(/,/gi, "")))) {
    //     //     //如果当前输入的不是数字就停止执行
    //     this.sum = ""; //防止不是数字是input出现NaN提示
    //     return false;
    //   }
    //   this.sum = parseFloat(newvalue.replace(/,/gi, ""))
    //     .toLocaleString()
    //     .toString();
    //   // .replace(/^\s/, ".00")
    // } /* 监听输入变化 */
  }
};
</script>
<style lang="scss" scoped>
.count-content {
  position: relative;
  min-width: 100%;
  min-height: 100%;
  background: #fff;
  box-sizing: border-box;
} /* 计算内容 */
.invest-date {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 85px;
  height: 60px;
  border-bottom: 1px solid #d9d9d9;
} /* 投资日期 */
.calendar {
  width: 15px;
  height: 15px;
} /* 日历图标 */
.lookPicker {
  position: relative;
  margin-left: 12px;
  color: #333;
  font-size: 14px;
  border-bottom: 1px solid #999;
} /* 日期 */
.lookPicker::after {
  content: "";
  display: inline-block;
  position: absolute;
  margin-left: 6px;
  margin-top: 6px;
  border: 7px solid transparent;
  border-top: 7px solid #c3c3c3;
} /* 三角 */
.sample {
  margin-left: 6px;
  color: #d8a863;
  font-size: 16px;
} /* 投资日期 */
.datetime-picker {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 9;
} /* 日期控件 */
.count-date {
  display: flex;
  padding: 41px 85px;
}
.count-date-line {
  display: flex;
  flex-wrap: wrap;
  & > span {
    display: flex;
    justify-content: center;
    flex-basis: 100%;
  }
  & > span:nth-child(1) {
    margin-bottom: 15px;
    font-size: 15px;
    color: #666;
  }
  & > span:nth-child(2) {
    color: #999;
    font-size: 13px;
  }
} /* 起息日期-到期日期 */
.line-border {
  border-right: 1px solid #d9d9d9;
} /* 竖线 */
.sum-title {
  display: flex;
  align-items: center;
  justify-content: center;
  & > span {
    font-size: 16px;
  }
  & > span:nth-child(2) {
    margin-left: 5px;
    color: #d8a863;
  }
} /* 投资金额 */
.money-icon {
  width: 15px;
  height: 15px;
} /* 金币图标 */
.count-box {
  padding: 38px 0 16px 0;
} /*  */
.input-box {
  display: flex;
  justify-content: center;
}
.sum-input {
  padding: 0;
  width: 105px;
  border-bottom: 1px solid #d9d9d9;
}
.button-box {
  padding: 0 15px;
}
.button-style {
  margin-top: 38px;
  width: 100%;
  font-size: 17px;
  background: #c8a556;
  border: none;
}
.remark {
  padding: 10px 0 15px 15px;
  font-size: 12px;
  color: #666;
} /* 备注 */
.income {
  display: flex;
  justify-content: space-between;
  padding: 20px 15px;
  background: #fff;
  box-sizing: border-box;
} //预期收益
.income-title {
  & > span:nth-child(1) {
    font-size: 15px;
    color: #333333;
  }
  & > span:nth-child(2) {
    font-size: 15px;
    color: #999999;
  }
}
.income-detailed {
  font-size: 20px;
  color: #d9a95d;
}
</style>
