<template>
  <div>
    <ul class="list-box">
      <li @click="verify">
        <span><pre>姓     名</pre></span>
        <span v-if="listData.idName">{{listData.idName | name}}</span>
        <span v-else style="color:red">未认证，请点击进行实名认证</span>
      </li>
      <li @click="verify">
        <span><pre>身  份 证</pre></span>
        <span v-if="listData.idNumber">{{listData.idNumber | changeID}}</span>
        <span v-else style="color:red">未认证，请点击进行实名认证</span>
      </li>
      <li>
        <span>绑 定 手 机</span>
        <span v-if="listData.phone">{{listData.phone | changePhone}}</span>
      </li>
      <li @click="bankManage">
        <span>默认银行卡</span>
        <span>{{listData.bankCardNumber}}<span>&#12288;></span></span>
      </li>
      <li @click="changeEmail">
        <span>电 子 邮 箱</span>
        <span>{{listData.email}}<span>&#12288;></span></span>
      </li>
      <li @click="changeAddress">
        <span>详 细 地 址</span>
        <div class="address-box">
          <span class="address">{{listData.address}}</span>
          <span>&#12288;></span>
        </div>
      </li>
      <li @click="changePwd">
        <span>登 录 密 码</span>
        <span>></span>
      </li>
    </ul>
    <p class="p-title">如需更换身份信息请拨打客服电话</p>
    <p class="p-title">客服电话&#12288;<a href="tel:400-800-0100" class="phone">400-800-0100</a></p>
  </div>
</template>
 
<script>
export default {
  name: "setList",
  components: {},
  data() {
    return {
      listData: ""
    };
  },
  created() {
    console.log("create");
    this.getInfo();
  },
  activated() {
    console.log("activated");
    this.getInfo();
  },
  computed: {},
  mounted() {},
  methods: {
    getInfo() {
      this.$api.setting.getSetting().then(res => {
        this.listData = res.data.data;
        console.log(this.listData);
      });
    }, //
    verify() {
      this.$router.push({
        path: "/writeIdInfo"
      });
    }, //实名认证
    changeEmail() {
      this.$router.push({
        path: "/setting/changeEmail"
      });
    }, //邮箱
    changeAddress() {
      this.$router.push({
        path: "/setting/changeAddress"
      });
    }, //地址
    changePwd() {
      this.$router.push({
        path: "/changePwd"
      });
    },
    bankManage() {
      this.$router.push({
        path: "/backCard-manage"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.list-box {
  margin-top: 11px;
  padding-left: 10px;
  background: #fff;
  pre {
    margin: 0;
  }
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 26px 15px;
    border-bottom: 1px solid #e8e8e8;
    & > span:nth-child(1) {
      font-size: 15px;
      color: #333;
    }
    span:nth-child(2) {
      font-size: 15px;
      color: #999;
    }
  }
  li:last-child {
    border: none;
  }
}
.p-title {
  font-size: 12px;
  color: #999;
  text-align: center;
}
.phone {
  color: #d6b87d;
}
.address-box {
  display: flex;
  justify-content: flex-end;
}
.address {
  width: 150px;
  font-size: 15px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
