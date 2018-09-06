<template>
  <div class="TradingFlowList" >
    <div class="wrapper"  ref="wrapper">
      <div>
        <p class="warpper-title">{{wrapperTitle}}</p>
        <ul class="content">
          <li v-for="(item,index) in list" :key ="index" class="van-hairline--bottom">
            <div class="first-item">
              <span class="play">{{item.productName}}</span>
              <span class="money">{{item.type > 0 ? `-${item.amount}`: `+${item.amount}`}}</span>
            </div>
            <div class="last-item">
              <span class="time">{{item.gmtCreate}}</span>
              <span class="status" :class="[item.status == 20 ? 'fail':'success']">{{setStatus(item.status,item.type)}}</span>
            </div>
          </li>
        </ul>
        </div>
      <!-- <div class="noContent-list" v-else>
        <img src="@/assets/img/user/noContent.png" class="noContent" alt="">
        <p>暂无交易内容</p>
      </div> -->
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";

export default {
  name: "TradingFlowList",
  props: {
    list: {
      type: Array,
      default: function() {
        return [];
      }
    },
    //定义为1就行了
    probeType: {
      type: Number,
      default: 1
    },
    /**
     * 点击列表是否派发click事件
     * 可以用来跳转路由
     */
    click: {
      type: Boolean,
      default: true
    },
    /**
  
    /**
     * 是否开启纵向滚动
     */
    scrollY: {
      type: Boolean,
      default: true
    },
    /**
     * 是否派发滚动事件
     */
    listenScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 列表的数据
     */
    data: {
      type: Array,
      default: null
    },
    /**
     * 是否派发滚动到底部的事件，用于上拉加载
     */
    pullup: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发顶部下拉的事件，用于下拉刷新 。这里可以使用手动刷新
     * 这里父级会穿一个值下来，同时通过子级会触发父级的事件
     */
    pulldown: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发列表滚动开始的事件
     */
    beforeScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 当数据更新后，刷新scroll的延时。 有20ms的延迟
     */
    refreshDelay: {
      type: Number,
      default: 20
    },
    pullDownRefresh: {
      type: Object,
      default: function() {
        return {
          threshold: 80,
          stop: 20
        };
      }
    },
    wrapperTitle: {
      type: String,
      default: "下拉刷新"
    }
  },
  data() {
    return {};
  },
  mounted() {
    //保证数据能够正常的渲染。使用
    this.$nextTick(() => {
      // let option = {
      //   probeType: this.probeType,
      //   click: this.click,
      //   pullDownRefresh: {
      //     threshold: 50,
      //     stop: 20
      //   }
      // };
      // this.scroll = new Bscroll(this.$refs.wrapper, option);
      // this.scroll.on("pullingDown", () => {
      //   console.log(11111111111111);
      //   alert("下拉刷新");
      //   this.scroll.finishPullDown(); // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则下拉事件只会执行一次
      // });
      this._initScroll();
    });
    // if (!this.scroll) {
    // this.scroll = new Bscroll(this.$refs.wrapper, option);
    // this.scroll.on("click", pos => {
    //   console.log(111111111111);
    //   // 下拉动作
    //   console.log(pos.y);
    //   // if (pos.y > 50) {
    //   //   // this.loadData();
    //   //   this.scroll.refresh();
    //   // }
    // });
    // } else {
    //   this.scroll.refresh();
    // }
  },
  methods: {
    setStatus(status, type) {
      if (status == 30) return "回款中";
      if (status == 20 && type == 1) return "回款失败";
      if (status == 20 && type == -1) return "付款失败";
      if (status == 10 && type == 1) return "回款成功";
      if (status == 10 && type == -1) return "付款成功";
    },
    //初始化整个滚动条
    _initScroll() {
      //判断是否存在wrap
      if (!this.$refs.wrapper) {
        return;
      }
      // better-scroll的初始化
      this.scroll = new Bscroll(this.$refs.wrapper, {
        //初始化整个项目
        probeType: this.probeType,
        click: this.click,
        scrollY: this.scrollY,
        pullDownRefresh: this.pullDownRefresh
      });
      this.scroll.on("pullingDown", () => {
        this.$emit("getList");
        // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，
        //否则下拉事件只会执行一次
        this.scroll.finishPullDown();
      });
    },
    refresh() {
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh();
    }
  }
};
</script>
<style lang="scss" scoped>
//启动页
.TradingFlowList {
  margin-top: 10px;
}
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
.wrapper {
  position: absolute;
  z-index: -1;
  top: 55px;
  width: 100%;
  // bottom: 0;
  // content: '\f010';
  height: 80vh;
  li {
    background: #fff;
    padding: 0 15px;
  }
  .first-item,
  .last-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 39px;
  }
  .play {
    font-size: 14px;
    color: #333333;
  }
  .money {
    color: #d3a55d;
    font-size: 18px;
  }
  .time {
    color: #999;
    font-size: 12px;
  }
  .status {
    font-size: 14px;
  }
  .success {
    color: #56c005;
  }
  .fail {
    color: #e1432e;
  }
}
</style>
