<template>
  <div class="InvestmentDetial">
    <common-header :title="title"></common-header>
  </div>
</template>
 
<script>
import CommonHeader from "common/CommonHeader";

export default {
  name: "MyInvestment",
  components: {
    CommonHeader
  },
  data() {
    return {
      title: "aaa"
    };
  },
  computed: {},
  created() {},
  activated() {
    this.getMsg();
  },
  methods: {
    getMsg() {
      let ID = this.$route.params.id;
      this.$api.invest.investDetial(ID).then(res => {
        let data = res.data;
        console.log(data);
        if (data.code) {
          // this.List = data.data.list;
          // this.pageTotal = data.data.lastPage;
          // this.dirty = true;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.MyInvestment {
  .header {
    line-height: 48px;
    text-align: center;
    color: #e8c763;
    font-size: 18px;
    background: #fff;
  }
}
</style>
