<template>
  <div class="common-footer">
    <ul class="footer-list">
      <router-link tag="li" to="/commend">
        <span class="iconfont icon-tuijian"></span>
        <div class="location">推荐</div>
      </router-link>
      <router-link tag="li" to="/financingList" >
        <span class="iconfont icon-licai"></span>
        <div class="location">理财</div>
      </router-link>
      <router-link tag="li" to="/my-investment">
        <span class="iconfont icon-iconfonttouzi"></span>
        <div class="location">投资</div>
      </router-link>
      <router-link tag="li" to="/me" >
        <span class="iconfont icon-me">
          <span class="point" v-if="msgNum > 0"></span>
        </span>
        <div class="location">我的</div>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  name: "CommonFooter",
  data() {
    return {
      msgNum: 0
    };
  },
  activated() {
    if (this.$store.getters.isLogin) {
      this.getNewMsg();
      this.getUser();
    }
  },
  methods: {
    getNewMsg() {
      this.$api.message.newMsg().then(res => {
        let data = res.data;
        if (data.code) {
          this.msgNum = data.data;
          this.$store.commit({
            type: "updatedMsgNum",
            num: data.data
          });
        }
      });
    },
    getUser() {
      this.$api.me.getMsg().then(res => {
        let data = res.data;
        if (data.code) {
          //这里写入对象
          this.$store.commit("getUser", data.data);
        }
      });
    }
  }
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
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  z-index: 2;
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
  .point {
    position: absolute;
    width: 8px;
    height: 8px;
    margin-left: -10px;
    margin-top: 4px;
    background: red;
    border-radius: 50%;
  }
}
</style>
