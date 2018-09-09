
<template>
 <div ref="wrapper" class="list-wrapper">
    <div class="scroll-content">
      <div ref="listWrapper">
        <slot>
        </slot>
        <div class="pullup-wrapper" v-if="pullUpLoad">
            <!-- 上拉的文本 -->
          <div class="before-trigger" v-if="!isPullUpLoad">
            <!-- isPullingDown初始时flase -->
            <span>{{pullUpTxt}}</span>
          </div>
          <div class="after-trigger" v-else>
            <van-loading />
          </div>
        </div>
      </div>
      <!-- </slot> -->
    </div>
    <slot name="pulldown"
          :pullDownRefresh="pullDownRefresh"
          :pullDownStyle="pullDownStyle"
          :beforePullDown="beforePullDown"
          :isPullingDown="isPullingDown"
          :bubbleY="bubbleY"
    >
      <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
        <!-- 这个下拉之前出现气泡 -->
        <div class="before-trigger" v-if="beforePullDown">
          <p class="update-title">松开立即刷新</p>
          <p class="update-title">最后刷新时间：{{lastUpdateTime|timeSecond}}</p>
        </div>
        <!-- beforePullDown初始值是true -->
        <div class="after-trigger" v-else>
          <div v-if="isPullingDown" class="loading">
            <van-loading />
          </div>
          <div v-else><span>{{refreshTxt}}</span></div>
        </div>
      </div>
    </slot>
  </div>
</template>
 
<script>
import BScroll from "better-scroll";
//引入buble就是下拉的动画
//获得元素的offset 相关的数据
import { getRect } from "@/assets/js/dom.js";
export default {
  name: "scroll", //组件的名字叫做scrool
  props: {
    data: {
      //获取数据，一系列的表格
      type: Array,
      default: function() {
        return [];
      }
    },
    //这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新
    pullDownRefresh: {
      type: null,
      default: function() {
        return {
          threshold: 90,
          stop: 50,
          txt: "刷新以完成完成"
        };
      }
    },
    //这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载
    pullUpLoad: {
      type: null,
      default: function() {
        return {
          threshold: 120,
          txt: {
            nomore: "没有更多的数据了",
            more: "上拉加载更多"
          }
        };
      }
    },
    refreshDelay: {
      //当数据更新后，刷新scroll的延时。
      type: Number,
      default: 20
    },
    dirty: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      beforePullDown: true, //下拉之前
      isRebounding: false, //回弹
      isPullingDown: false, //正在下拉
      isPullUpLoad: false, //用来html显示文字
      // pullUpDirty: this.dirty, //用来确定下拉的字体的
      pullDownStyle: "", //下拉的样式？
      bubbleY: 0, //初始的Y坐标
      lastUpdateTime: new Date()
    };
  },
  computed: {
    //计算属性用来确定显示的文字
    pullUpDirty() {
      return this.dirty;
    },
    pullUpTxt() {
      //第一个为false 直接返回第二个选项
      const moreTxt =
        //pullLoad这个配置用于做上拉加载功能，默认为 false
        (this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more) ||
        "加载更多";
      const noMoreTxt =
        (this.pullUpLoad &&
          this.pullUpLoad.txt &&
          this.pullUpLoad.txt.noMore) ||
        "没有更多数据了";
      //pullUpDirty首次设置为true，
      //pullUpDirty主要是为了显示，我们能否加载数据
      return this.pullUpDirty ? moreTxt : noMoreTxt;
    },
    //显示下拉刷新的文本
    refreshTxt() {
      //this.pullDownRefresh前提是这个值要存在
      return (
        (this.pullDownRefresh && this.pullDownRefresh.txt) || "下拉刷新完成"
      );
    }
  },
  created() {
    //这个-50 不知道是用来干嘛的
    this.pullDownInitTop = -56;
  },
  mounted() {
    //数据挂载后执行初始化整个组件
    setTimeout(() => {
      this.initScroll();
    }, 20);
  },
  destroyed() {
    //实例销毁后整个组件销毁
    this.$refs.scroll && this.$refs.scroll.destroy();
  },
  methods: {
    //初始化整个实例
    initScroll() {
      //如果没有设置$ref=wrapper，则没法挂载整个元素
      if (!this.$refs.wrapper) {
        return;
      }
      //保证整个元素存在。listWrapper只要是为了渲染整个元素列表
      //而且 必须要有pullDownRefresh或者pullUpLoad就是为了
      if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
        //整个列表的最小高度比容器整个容器的高度大1px
        this.$refs.listWrapper.style.minHeight = `${getRect(this.$refs.wrapper)
          .height + 1}px`;
      }
      let options = {
        probeType: 1, //1
        click: true, //点击事件
        pullDownRefresh: this.pullDownRefresh, ///这个配置可以向下滑动
        pullUpLoad: this.pullUpLoad, //整个配置向上滑动
        startY: 0 //初始Y坐标为0
      };
      //初始化项目
      this.scroll = new BScroll(this.$refs.wrapper, options);
      //下拉触发下拉事件
      if (this.pullDownRefresh) {
        this._initPullDownRefresh();
      }
      //上啦触发上啦事件
      if (this.pullUpLoad) {
        this._initPullUpLoad();
      }
    },
    //刷新事件
    //作用：重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    //销毁事件
    destroy() {
      this.scroll.destroy();
    },
    //强制更新
    forceUpdate() {
      //是都正在下滑。
      if (this.pullDownRefresh && this.isPullingDown) {
        //isPullingDown的值设置为false
        this.isPullingDown = false;
        //执行回调函数
        this._reboundPullDown().then(() => {
          this._afterPullDown();
        });
      } else if (this.pullUpLoad && this.isPullUpLoad) {
        //上拉
        setTimeout(() => {
          this.isPullUpLoad = false; //设置为false
          this._reboundPullUp();
          this.scroll.finishPullUp(); //上拉的话pullUp必须要执行一次
          // this.pullUpDirty = dirty; //dirty就是传进来的值
          this.refresh(); //强制刷新
        }, 1000);
      } else {
        this.refresh(); //不是上拉或者下拉就是刷新
      }
    },
    //初始化下拉事件
    _initPullDownRefresh() {
      //调用pullingDown事件触发时机：在一次下拉刷新的动作后，这个时机一般用来去后端请求数据。
      this.scroll.on("pullingDown", () => {
        //beforePullDoen的值是true。刚开始气泡是显示的回弹的过程值为false，气泡消失
        //loading加载动画显示，加载动画消失后，才会加载文字
        //设置before 和 正在下拉都是为true
        //当下拉的距离超过120px就会触发这个事件
        this.beforePullDown = false; //这个是用来控制气泡的
        this.isPullingDown = true; //这个是用来控制显示加载动画的
        this.$emit("pullingDown"); //想上传一个事件，请求数据
      });
      this.scroll.on("scroll", pos => {
        //scrool事件，只要滑动就会触发这个事件
        //如果不存在下拉，就直接返回
        if (!this.pullDownRefresh) {
          return;
        }

        //如果气泡出现。这里如果是beforePullDown为true。
        //直接计算气泡的尺寸，如果是回弹这个尺寸初始化为0
        if (this.beforePullDown) {
          //只要执行下拉操作更新下拉刷新的时间
          if (pos.y == 1) {
            this.lastUpdateTime = new Date();
          }
          // this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop);
          //pullDownStyle 就是为了设置下拉刷新的的样式
          //初始值是-50，这个显示的字段隐藏在上面
          //随着下拉这个这个值变小，我们能看到的就是，这个字段有个下拉的动画
          //当继续下拉的时候，pos.y + this.pullDownInitTop >10选择10
          //此时这个动画就固定在在容器下面的10px的位置
          //这些效果都是在下拉之前触发
          this.pullDownStyle = `top:${Math.min(
            pos.y + this.pullDownInitTop,
            10
          )}px`;
        } else {
          //气泡不存这个样式就是0
          // this.bubbleY = 0;
          //向上回弹执行的操作
        }
        if (this.isRebounding) {
          //这个值初始值是false，这里我设置的top是50。
          //主要是为了文字当上滑的效果，显示为刷新成功的时候
          this.pullDownStyle = `top:${10 -
            (this.pullDownRefresh.stop - pos.y)}px`;
        }
      });
    },
    _initPullUpLoad() {
      //上拉刷新
      this.scroll.on("pullingUp", () => {
        this.isPullUpLoad = true; //文字消失，动画加载
        //文字显现，向上出发事件
        // let pageNum = this.$route.params.pages;

        this.$emit("pullingUp");
      });
    },
    _reboundPullDown() {
      //一种结构赋值的写法.这个对象pullDownRefresh病呢与stop这个值
      //所以stopTime就是600
      const { stopTime = 600 } = this.pullDownRefresh;
      return new Promise(resolve => {
        setTimeout(() => {
          //下拉600ms，用来控制气泡?
          this.isRebounding = true;
          //告诉组件已经结束了
          //当下拉刷新数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载。
          this.scroll.finishPullDown();
          //改变为成功，状态
          resolve();
        }, stopTime);
      });
    },
    _afterPullDown() {
      //结束下拉后
      setTimeout(() => {
        //这个样式就是用来设置绝对定位多少px ，这里是-50
        this.pullDownStyle = `top:${this.pullDownInitTop}px`;
        //结束后beforPullDown,下拉会再次显示气泡
        this.beforePullDown = true;
        this.isRebounding = false; //计算高度的初始值为false
        this.refresh(); //刷新整个组件
        //刷新整个页面,使用20ms
      }, this.scroll.options.bounceTime);
    },
    _reboundPullUp() {
      setTimeout(() => {
        //这个样式就是用来设置绝对定位多少px ，这里是-50
        //结束后beforPullDown,下拉会再次显示气泡
        //刷新整个页面,使用20ms
      }, this.scroll.options.bounceTime);
    }
  },
  watch: {
    //列表的数据发生变化的时候，整个组件更新
    data() {
      //列表的数据发生变化。我可以直接使用props
      setTimeout(() => {
        this.forceUpdate();
      }, this.refreshDelay);
    }
  }
};
</script>
<style lang="scss" scoped>
//启动页
.list-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  // background: #fff;
  overflow: hidden;
  .scroll-content {
    position: relative;
    z-index: 1;
  }
  .pulldown-wrapper {
    position: absolute;
    width: 100%;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all;
    .after-trigger {
      margin-top: 10px;
    }
  }
  .pullup-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 0;
    margin-bottom: 20px;
  }
  .update-title {
    text-align: center;
  }
}
</style>
