<template>
  <div class="common-footer">
    <ul class="footer-list">
      <router-link tag="li" to="/commend">
        <span class="iconfont icon-tuijian"></span>
        <div class="location">推荐</div>
      </router-link>
      <li>
        <span class="iconfont icon-licai"></span>
        <div class="location">理财</div>
      </li>
      <li>
        <span class="iconfont icon-iconfonttouzi"></span>
        <div class="location">投资</div>
      </li>
      <router-link tag="li" to="/me">
        <span class="iconfont icon-me"></span>
        <div class="location">我的</div>
      </router-link>
     
    </ul>
  </div>
</template>
<script>
export default {
  name: "CommonFooter"
};
</script>
<style lang="scss" scoped>
.router-link-exact-active {
  .iconfont,
  .location {
    color: #ebd295 !important;
  }
}
.common-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  background: #fff;
  .footer-list {
    display: flex;
    height: 100%;
    li {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .iconfont {
        color: #c5c5c5;
      }
      .icon-tuijian {
        font-size: 30px;
      }
      .icon-licai {
        font-size: 32px;
      }
      .icon-iconfonttouzi {
        font-size: 31px;
      }
      .icon-me {
        font-size: 31px;
      }
      .location {
        color: #c5c5c5;
      }
    }
  }
}
</style>
