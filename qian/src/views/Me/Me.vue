<template>
  <div class="me">
    <me-header :user-list="userMsg"></me-header>
  </div>
</template>
 
<script>
// import MeHeader from "@/components/Me/MeHeader.vue";
import MeHeader from "@/components/Me/MeHeader";
export default {
  name: "Me",
  components: {
    MeHeader
    // MainContent
  },
  data() {
    return {
      userMsg: null
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
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
//启动页
</style>
