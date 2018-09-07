<template>
    <div class="noContent-list">
      <img src="@/assets/img/user/noContent.png" class="noContent" alt="">
      <p>暂无交易内容</p>
    </div>
</template>
 
<script>
export default {
  name: "CommonNoContent"
};
</script>
<style lang="scss" scoped>
.noContent-list {
  margin-top: 112px;
  text-align: center;
  img {
    width: 123px;
  }
  p {
    color: #666;
    font-size: 13px;
  }
}
</style>
