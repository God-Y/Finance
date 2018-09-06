<template>
  <div class="me-list">
    <ul>
      <li v-for="item in list" :key="item.id" class="van-hairline--bottom" @click="goPage(item.path)">
        <div class="icon-box">
            <span class="iconfont icon-item" :class="item.icon" ></span>
            <span class="title">{{item.title}}</span>
        </div>
        <span class="iconfont icon-jiantouyou"></span>
      </li>
    </ul>
    <div class="phone-container">
      <div class="phone">
        <p><span class="iconfont icon-lianxikefu"></span> 客服电话  <span class="number">400-8000-100</span>   </p>
        <p><span class="iconfont icon-jiankangyunshijian"></span> 上班时间  <span class="number">9:00 - 18:00</span>  </p>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "MeList",
  data() {
    return {
      list: [
        { id: 1, title: "银行卡管理", icon: "icon-yinhangqia", path: "" },
        {
          id: 2,
          title: "交 易 流 水",
          icon: "icon-licai-copy",
          path: "/trading-flow"
        },
        { id: 3, title: "消 息 中 心", icon: "icon-xiaoxi", path: "" },
        { id: 4, title: "消 息 中 心", icon: "icon-dian", path: "" }
      ]
    };
  },
  methods: {
    goPage(path) {
      this.$router.push(path);
    }
  }
};
</script>
<style lang="scss" scoped>
//启动页
.me-list {
  margin-top: 5px;
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
  //联系方式
  .phone-container {
    text-align: center;
    margin-top: 15px;
    font-size: 14px;
    color: #666666;
    div {
      display: inline-block;
      text-align: initial;
      p {
        margin-top: 0;
        margin-bottom: 8px;
        .icon-lianxikefu {
          font-size: 18px;
          vertical-align: -1px;
        }
      }
      .number {
        margin-left: 10px;
        color: #d6b87d;
      }
    }
  }
}
</style>
