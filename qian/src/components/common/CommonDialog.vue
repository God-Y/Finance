<template>
  <div class="common-footer">
    <div class="footer-box">

    <ul>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
    </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "CommonDialog"
};
</script>
<style lang="scss" scoped>
.common-footer {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.3);
  .footer-box {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: #fff;
  }
}
</style>
