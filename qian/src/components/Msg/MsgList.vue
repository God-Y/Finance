<template>
  <div class="msg-list" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
 
<script>
import BScroll from "better-scroll";
export default {
  name: "MessageContentList",
  data() {
    return {};
  },
  computed: {},
  mounted() {
    if (!this.scroll) {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          tap: true
        });
        this.scroll.on("touchEnd", function() {
          clearTimeout(this.Loop);
        });
        this.scroll.on("beforeScrollStart", () => {
          clearTimeout(this.Loop);
          this.Loop = setTimeout(() => {}, 2000);
        });
      });
    } else {
      this.scroll.refresh();
    }
  }
};
</script>
<style lang="scss" scoped>
//启动页
.msg-list {
  height: 88vh;
}
</style>
