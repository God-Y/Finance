<template>
  <div class="me">
    <me-header :user="userMsg" :profit ="profit"></me-header>
    <me-list></me-list>
    <common-footer></common-footer>
  </div>
</template>
 
<script>
import MeHeader from "@/components/Me/MeHeader";
import MeList from "@/components/Me/MeList";
import CommonFooter from "common/CommonFooter";
export default {
  name: "Me",
  components: {
    MeHeader,
    MeList,
    CommonFooter
  },
  data() {
    return {
      userMsg: null,
      profit: null
    };
  },
  created() {
    this.getMsg();
  },
  methods: {
    getMsg() {
      this.$api.me.getMsg().then(res => {
        let data = res.data;
        if (data.code) {
          this.userMsg = data.data;
          //获取profit这个属性
          let profit = ~~data.data.profit;
          this.profit = profit.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
//启动页
</style>
