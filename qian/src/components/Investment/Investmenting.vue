<template>
  <div>
    <CommonScrool
      @pullingDown="pullingDown" 
      :data='List' 
      :dirty="dirty"
      @pullingUp="pullingUp"
      v-if="List.length"
    >
       <ul class="list-container">
          <li v-for="item in List" 
            :key ="item.id" 
            @click="clickItem(item.id)"
            class="investList"
          >
            <img src="@/assets/img/user/new.png" class="new" v-if="item.investmentStatus ==10">
            <div class="list-content">
              <div class="list-box">
                <i class="iconfont icon-renminbi"></i>
                <span>投资中</span>
                <span class="item-footer">{{item.name}}</span>
              </div>
              <div class="list-box van-hairline--left">
                <span class="year">{{item.annualizedIncome*100|amount}}</span>
                <span class="item-footer">预期年化（%）</span>
              </div>
              <div class="list-box van-hairline--left">
                <span class="invest-money">{{item.investmentAmount|amountInteger}}</span>
                <span class="item-footer">投资金额（元）</span>
              </div>
            </div>
            <div class="list-footer van-hairline--top">
              <span>
                {{item.valueDateStart|time}}起息 - {{item.valueDateEnd|time}}到息
              </span>
                <span class="iconfont icon-jiantouyou"></span>
            </div>
          </li>
        </ul>
    </CommonScrool>
    <no-content v-else></no-content>
  </div>
</template>
 
<script>
import CommonScrool from "common/CommonScrool";
import NoContent from "common/CommonNoContent";
export default {
  name: "Investmenting",
  components: {
    CommonScrool,
    NoContent
  },
  data() {
    return {
      List: [],
      dirty: true,
      pageTotal: 0,
      pageNum: 1
    };
  },
  activated() {
    this.loadData();
  },
  methods: {
    //获取数据
    loadData() {
      this.$api.invest.investList(10).then(res => {
        let data = res.data;
        if (data.code) {
          this.List = data.data.list;
          this.pageTotal = data.data.lastPage;
          this.dirty = true;
        }
      });
    },
    clickItem(id) {
      this.$router.push(`/investment-detial/${id}`);
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
        this.$api.invest.investList(10, this.pageNum).then(res => {
          let data = res.data;
          if (data.code) {
            this.List = this.List.concat(data.data.list);
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
.list-container {
  background: #eee;
  padding-top: 10px;
  li:first-child {
    margin-top: 0;
  }
  .new {
    position: absolute;
    background: #fff;
    top: 0;
    width: 22px;
    right: 10px;
  }
}

.investList {
  position: relative;
  margin-top: 10px;
  background: #fff;
  padding-top: 32px;
  .list-content {
    display: flex;
    margin-bottom: 18px;
    .new {
      top: 0;
    }
    .list-box {
      flex: 1;
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding-left: 25px;
      .icon-renminbi {
        position: absolute;
        margin-left: -18px;
        margin-top: -12px;
        font-size: 16px;
        color: #e8c763;
      }
      span:first-of-type {
        font-size: 17px;
        color: #404b5f;
      }
      .year {
        color: #e8c763 !important;
      }
      .item-footer {
        margin-top: 9px;
        color: #666;
        font-size: 12px;
      }
    }
  }
  .list-footer {
    display: flex;
    justify-content: space-between;
    padding-left: 18px;
    padding-right: 16px;
    color: #999;
    line-height: 35px;
  }
}
</style>
