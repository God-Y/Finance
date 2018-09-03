<template>
  <div class="me-header">
    <!-- <img src="@/assets/img/user/bg.png" alt=""> -->
    <div class="photo-box">
      <div class="photo"></div>
      <span class="user-name" v-if="user">{{user.idName||user.phone}}</span>
    </div> 
    <img src="@/assets/img/user/setUp.png" class="set-up" alt="">
    <div class="money">
      <div>总资产（元）</div>
      <!-- <div>{{}}</div> -->
    </div>
  </div>
</template>
 
<script>
export default {
  name: "MeHeader",
  props: {
    userList: Object
  },
  computed: {
    user() {
      return this.userList;
    }
  }
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
}
</style>
