<template>
  <div id="app">
    <div class="no-net" v-if="!netWork">
      <span class="iconfont icon-WIFIxinhao-ji"></span>
      <span class="net-title">加载失败或网络错误</span>
      <van-button type="primary" class="submit-btn" @click="$router.go(0)">重新加载</van-button>
    </div>
    <keep-alive v-else>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "APP",
  computed: mapState(["netWork"])
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
.no-net {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20vh;
  .net-title {
    margin: 20px 0;
    font-size: 14px;
  }
  .icon-WIFIxinhao-ji {
    font-size: 240px;
  }
}
</style>
