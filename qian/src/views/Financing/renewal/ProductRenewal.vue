<template>
  <div>
    <commenHeader title="产品续投"></commenHeader>
    <main class="main-box">
      <div class="info-box">
        <p>新手体验计划</p>
        <ul>
          <li>
            <span>10.00</span>
            <span>预期年化（%）</span>
          </li>
          <li>
            <span>3</span>
            <span>理财期限（月）</span>
          </li>
          <li>
            <span>50,000.00</span>
            <span>起投金额（元）</span>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            <span>起息日期</span>
            <span>2016.11.07</span>
          </li>
          <li></li>
          <li>
            <span>到期日期</span>
            <span>2017.11.08</span>
          </li>
        </ul>
        <p>300.00</p>
        <p>预期收益</p>
      </div>
      <div>
        <span>回款至</span>
        <span>工商银行<span>（尾号2508）</span></span>
      </div>
      <div>
        <van-checkbox v-model="checked">
          本人已认真阅读并同意
          <a>《xxxxxxx协议》</a>
        </van-checkbox>
      </div>
      <p>
        <span>备注：</span>
        续投会在投资到期时将投资本金自动转入下次投资中，利息照常回款。
      </p>
      <div>
        <p>投资本金<span>¥ 1000.00</span></p>
        <van-button type="warning">确定</van-button>
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
      checked: true
    };
  },
  activated() {},
  created() {},
  computed: {},
  mounted() {},
  methods: {},
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
</style>
