<template>
  <div>
    <div class="me-header" v-if="user">
      <div class="photo-box">
        <div class="photo"></div>
        <span class="user-name" >{{user.idName||user.phone}}</span>
      </div> 
      <img src="@/assets/img/user/setUp.png" class="set-up" alt="">
      <div class="money">
        <div>总资产（元）</div>
        <div class="assets" >{{user.assets|amount}}</div>
      </div>
    </div>
    <div class="profit">
      <span>累计收益（元）</span>
      <span>{{profit}}</span>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "MeHeader",
  props: ["user", "profit"]
};
</script>
<style lang="scss" scoped>
//启动页
.me-header {
  position: relative;
  height: 230px;
  background: url("../../assets/img/user/bg.png") left top/100%;
  .set-up {
    position: absolute;
    top: 12px;
    right: 17px;
    width: 22px;
  }
  .photo-box {
    display: flex;
    align-items: center;
    position: absolute;
    color: #fff;
    top: 7px;
    left: 16px;
    font-size: 16px;
    .photo {
      width: 42px;
      height: 42px;
      margin-right: 8px;
      background: red;
      border-radius: 50%;
    }
  }
  .money {
    @extend %po-center;
    text-align: center;
    color: #fff;
    margin-top: 10px;
    font-size: 13px;
    .assets {
      margin-top: 21px;
      font-size: 30px;
    }
  }
}
.profit {
  display: flex;
  background: #fff;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  height: 50px;
  span:first-child {
    font-size: 15px;
    color: #464c5e;
  }
  span:last-child {
    color: #d4a657;
    font-size: 17px;
  }
}
</style>
