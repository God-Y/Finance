<template>
  <div class="msg-list">
   <common-header title="消息中心"></common-header>
   <msg-list>
     <ul>
       <template v-for="item in List">
        <li v-if="item.code" :key="item.gmtCreate" 
        @tap="tap" 
        @touchstart="timeStart()" 
        @touchend="timeEnd()">
          <div class="item-top van-hairline--bottom">
            <span class="msg-title">{{getStatus(item.code)}}</span>
            <span class="date">{{item.gmtCreate|time}}</span>
          </div>
          <div class="item-bottom">
            <span>{{item.name+getStatus(item.code)}}</span>
            <span class="iconfont icon-jiantouyou"></span>
          </div>
        </li>
        <li v-else :key="item.gmtCreate">
          <div class="item-top">
            <span class="msg-title">活动消息</span>
            <span class="date">{{item.gmtCreate|time}}</span>
          </div>
          <div class="item-bottom"> 
            <span>{{item.brief}}</span>
            <span class="iconfont icon-jiantouyou"></span>
          </div>
        </li>
       </template>
     </ul>
   </msg-list>
  </div>
</template>
 
<script>
import CommonHeader from "common/CommonHeader";
import msgList from "@/components/Msg/MsgList.vue";
export default {
  name: "MessageList",
  components: {
    CommonHeader,
    msgList
  },
  data() {
    return {
      List: {},
      timer: null,
      start: 0,
      end: 0
    };
  },
  activated() {
    this.getMsg();
  },
  computed: {},
  methods: {
    getMsg() {
      this.$api.message.getMsg().then(res => {
        let data = res.data;
        if (data.code) {
          this.List = data.data;
        }
      });
    },
    getStatus(value) {
      switch (value) {
        case 10:
          return "投资成功";
        case 20:
          return "投资失败";
        case 30:
          return "即将到期";
        case 40:
          return "正在回款";
        case 50:
          return "回款成功 ";
        case 60:
          return "回款失败";
      }
    },
    timeStart() {
      //计算开始时间
      clearTimeout(this.timer);
      this.start = new Date().valueOf();
      this.timer = setTimeout(() => {
        this.$dialog
          .confirm({
            message: "是否删除该条信息"
          })
          .then(() => {})
          .catch(() => {
            this.$toast("取消操作");
          });
      }, 400);
    },
    timeEnd() {
      //计算结束时间
      clearTimeout(this.timer);
      this.end = new Date().valueOf();
    },
    tap() {
      let duration = this.end - this.start;
      if (duration > 400) {
        console.log("出现传入页面");
      } else {
        console.log("出现单击事件");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
//message
.msg-list {
  li {
    margin-top: 10px;
    background: #fff;
    div {
      padding: 0 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .item-top {
      height: 38px;
    }
    .item-bottom {
      height: 48px;
    }
    .msg-title {
      font-size: 14px;
      color: #d3a55d;
    }
    .date {
      color: #999999;
      font-size: 12px;
    }
  }
}
</style>
