<template>
  <div class="msg-list">
   <common-header title="消息中心"></common-header>
   <msg-list>
     <ul>
       <template v-for="item in List">
         <!-- 用户消息 -->
        <li 
          v-if="item.code" 
          :key="item.gmtCreate" 
          @tap="tapUser(item)" 
          @touchstart="timeStart(item.id,0)" 
          @touchend="timeEnd()"
          :class="[item.look ==10 ?'isLook':'']"
        >
          <div class="item-top van-hairline--bottom">
            <span class="msg-title">{{getStatus(item.code)}}</span>
            <span class="date">{{item.gmtCreate|time}}</span>
          </div>
          <div class="item-bottom">
            <span>{{getStatusMSg(item)}}</span>
            <span class="iconfont icon-jiantouyou"></span>
          </div>
        </li>
        <li 
          v-else 
          :key="item.gmtCreate"
          @tap="tapPlat(item.id)" 
          @touchstart="timeStart(item.id,1)" 
          @touchend="timeEnd()"
          :class="[item.look ==10 ?'isLook':'']"
        >
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
        case 70:
          return "续投成功";
        case 80:
          return "开始续投";
        case 100:
          return "实名通过";
        case 101:
          return "实名未通过";
        case 102:
          return "取消实名";
      }
    },
    getStatusMSg(item) {
      //平台消息
      if (item.code < 100) {
        return item.name + this.getStatus(item.code);
      } else {
        return "实名消息：" + this.getStatus(item.code);
      }
    },
    timeStart(id, index) {
      //计算开始时间
      clearTimeout(this.timer);
      this.start = new Date().valueOf();
      this.timer = setTimeout(() => {
        this.$dialog
          .confirm({
            message: "是否删除该条信息"
          })
          .then(() => {
            //判断时候用户消息
            if (index == 0) {
              this.$api.message.userMsg(id, 20).then(res => {
                console.log(res);
                let data = res.data;
                if (data.code) {
                  //调用一次promise，然后先出现提示消息然后去执行请求数据
                  this.$toast.success("删除成功");
                  setTimeout(() => {
                    this.getMsg();
                  }, 500);
                }
              });
            } else {
              //判断时候平台消息
              this.$api.message.deleteImgMsg(id).then(res => {
                console.log(res);
                let data = res.data;
                if (data.code) {
                  //调用一次promise，然后先出现提示消息然后去执行请求数据
                  this.$toast.success("删除成功");
                  setTimeout(() => {
                    this.getMsg();
                  }, 500);
                }
              });
            }
          })
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
    //用户消息
    tapUser(item) {
      let duration = this.end - this.start;
      //小于400ms触发点击事件
      if (duration < 400) {
        this.$api.message.userMsg(item.id, 10).then(res => {
          let data = res.data;
          if (data.code) {
            if (item.code >= 100) {
              this.$router.push(`/real-name/${item.code}`);
            } else if (item.code != 20 && item.code < 100) {
              this.$router.push(`/investment-detial/${item.investmentUserId}`);
            } else {
              this.$router.push(`/invest-fail/${item.name}`);
            }
          }
        });
      }
    },
    //平台消息
    tapPlat(id) {
      let duration = this.end - this.start;
      //触发平台消息，获取长图片
      if (duration < 400) {
        console.log(161616);
        this.$router.push(`/check-msg/${id}`);
      }
    },
    toInvest(id) {
      this.$api.message.userMsg(id).then(res => {
        console.log(res);
      });
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
  .isLook {
    background: #d8d8d8;
  }
}
</style>
