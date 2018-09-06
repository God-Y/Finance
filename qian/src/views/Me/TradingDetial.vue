<template>
  <div class="me">
    <common-header title="交易详情"></common-header> 
    <detial-list :list="List"></detial-list>
    <div class="footer">备注：具体到账以银行实际到账为准</div>
  </div>
</template>
 
<script>
import CommonHeader from "common/CommonHeader";
import DetialList from "@/components/Trading/TradingDetialList";
export default {
  name: "TradingDetial",
  components: {
    CommonHeader,
    DetialList
  },
  data() {
    return {
      List: null
    };
  },
  computed: {
    ID() {
      return this.$route.params.id;
    }
  },
  created() {
    this.getList();
  },
  methods: {
    //获取数据
    getList() {
      this.$api.me.getTradingDetial(this.ID).then(res => {
        let data = res.data;
        if (data.code) {
          this.List = data.data;
          //获取profit这个属性
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
//启动页
.footer {
  padding-left: 15px;
  color: #999;
  margin-top: 10px;
}
</style>
