<template>
  <div >
    <common-header title="交易流水"></common-header> 
    <CommonScrool 
      @pullingDown="pullingDown" 
      :data='List' 
      :dirty="dirty"
      @pullingUp="pullingUp"
      v-if="List"
    >
       <ul class="list-content">
          <li v-for="item in List" 
            :key ="item.id" 
            @click="clickItem(item.id)"
            class="van-hairline--bottom"
          >
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
    </CommonScrool>
    <div class="noContent-list" v-else>
    <img src="@/assets/img/user/noContent.png" class="noContent" alt="">
    <p>暂无交易内容</p>
  </div>
  </div>
</template>
 
<script>
import CommonHeader from "common/CommonHeader";
import CommonScrool from "common/CommonScrool";
export default {
  name: "TradingFlow",
  components: {
    CommonHeader,
    CommonScrool
  },
  data() {
    return {
      List: null,
      dirty: true,
      pageTotal: 0,
      pageNum: 1
    };
  },
  created() {
    this.loadData();
  },
  activated() {
    this.loadData();
  },
  methods: {
    //获取数据
    loadData() {
      this.$api.me.getList().then(res => {
        let data = res.data;
        if (data.code) {
          this.List = data.data.list;
          this.pageTotal = data.data.lastPage;
          this.dirty = true;
        }
      });
    },
    setStatus(status, type) {
      if (status == 30) return "回款中";
      if (status == 20 && type == 1) return "回款失败";
      if (status == 20 && type == -1) return "付款失败";
      if (status == 10 && type == 1) return "回款成功";
      if (status == 10 && type == -1) return "付款成功";
    },
    clickItem(id) {
      this.$router.push(`/trading-detial/${id}`);
    },
    //下拉加载数据
    pullingDown() {
      this.pageNum = 1;
      this.loadData();
    },
    //上拉加载
    pullingUp() {
      //页数小于等于页总数，发送请求数组相加
      this.pageNum++;
      if (this.pageNum <= this.pageTotal) {
        this.$api.me.getList(this.pageNum).then(res => {
          let data = res.data;
          if (data.code) {
            this.List = this.List.concat(data.data.list);
            console.log(this.List);
          }
        });
      } else {
        this.List = this.List.slice(0);
        this.dirty = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
//启动页
.list-content {
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
