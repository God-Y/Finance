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
          click: true
          // tap: true
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
