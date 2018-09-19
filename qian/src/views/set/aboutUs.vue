<template>
  <div class="help">
    <common-header title="关于我们" class="header"></common-header>
    <div class="wrapper" ref="wrapper">
        <ul class="content">
          <li v-for="item in data" :key="item.id">
            <img :src="item.content">
          </li>
        </ul>
    </div >
     
  </div>
</template>
 
<script>
import CommonHeader from "common/CommonHeader";
import Bscroll from "better-scroll";
export default {
  name: "AboutUs",
  components: {
    CommonHeader
  },
  data() {
    return {
      data: null
    };
  },
  created() {
    this.getMsg();
  },
  mounted() {
    if (!this.scrool) {
      this.scrool = new Bscroll(this.$refs.wrapper, {});
    } else {
      this.scrool.refresh();
      this.scrool.scrollTo(0, 0);
    }
  },

  methods: {
    getMsg() {
      this.$api.set.aboutUs().then(res => {
        let data = res.data;
        if (data.code) {
          this.data = data.data;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  position: fixed;
  width: 100%;
  top: 0;
}
.wrapper {
  margin-top: 50px;
  height: 80vh;
  img {
    width: 100%;
  }
}
</style>
