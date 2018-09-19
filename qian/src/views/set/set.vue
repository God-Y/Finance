<template>
  <div class="set">
    <common-header title="更多设置" class="header"></common-header>
    <div class="main">
    
      <ul>
        <li v-for="item in list" :key="item.id" class="van-hairline--bottom" @click="goPage(item.id,item.path)">
          <div class="icon-box">
              <span class="iconfont icon-item" :class="item.icon" ></span>
              <span class="title">{{item.title}}</span>
          </div>
          <span class="iconfont icon-jiantouyou">
          </span>
        </li>
      </ul>
    </div>
    <div class="footer-box">
      <van-button 
          class="button-style" 
          type="warning"
          @click="loginout"
        >退出登陆</van-button>
    </div>
  </div>
</template>
 
<script>
import CommonHeader from "common/CommonHeader";

export default {
  name: "Set",
  components: {
    CommonHeader
  },
  data() {
    return {
      data: null,
      list: [
        {
          id: 1,
          title: "帮 助 中 心",
          icon: "icon-yinhangqia",
          path: "/help"
        },
        {
          id: 2,
          title: "关 于 我 们",
          icon: "icon-licai-copy",
          path: "/aboutUs"
        },
        { id: 3, title: "意 见 反 馈", icon: "icon-xiaoxi", path: "/option" },
        { id: 4, title: "清 除 缓 存", icon: "icon-dian", path: "/setting" }
      ]
    };
  },
  created() {},
  methods: {
    goPage(id, path) {
      if (id !== 4) {
        this.$router.push(path);
      } else {
        this.$dialog
          .confirm({
            title: "清除缓存",
            message: "确认清除缓存"
          })
          .then(() => {
            this.$toast.success("清除缓存成功");
          })
          .catch(() => {
            this.$toast("取消操作");
          });
      }
    },
    loginout() {
      this.$dialog
        .confirm({
          title: "退出登陆",
          message: "确认退出登陆"
        })
        .then(() => {
          this.$api.set.loginout().then(res => {
            if (res.data.code == 1) {
              this.$toast.success(res.data.message);
            }
            //跳转到登陆页面
            setTimeout(() => {
              this.$router.push("/login");
              this.$store.commit("loginout");
            }, 1000);
          });
        })
        .catch(() => {
          this.$toast("取消操作");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  position: fixed;
  width: 100%;
}
.main {
  padding-top: 60px;
}
.set {
  ul {
    li {
      display: flex;
      justify-content: space-between;
      padding: 0 16px;
      align-items: center;
      height: 60px;
      background: #fff;
      .icon-item {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        color: #fff;
      }
      .icon-box {
        line-height: 60px;
        height: 100%;
      }
      .icon-yinhangqia {
        background: #33b1f2;
        font-size: 11px;
      }
      .icon-licai-copy {
        background: #fb605d;
        font-size: 15px;
      }
      .icon-xiaoxi {
        background: #33b1f2;
        font-size: 15px;
      }
      .icon-dian {
        background: #2dc88f;
        font-size: 15px;
      }
      .title {
        margin-left: 10px;
        font-size: 15px;
        color: #6b728e;
      }
    }
  }
  .footer-box {
    position: fixed;
    bottom: 25px;
    padding: 0 15px;
    width: 100%;
    box-sizing: border-box;
    .button-style {
      width: 100%;
    }
  }
}
</style>
