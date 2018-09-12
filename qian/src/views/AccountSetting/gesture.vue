<template>
  <div class="gesture">
    <div class="header-box">
      <img src="@/assets/img/back.png" @click="$router.go(-1)">
      <span>{{title}}</span>
    </div>
    <p id="title">绘制手势密码，至少连接4个点</p>
    <div class="canvasBox">
      <canvas ref="canva" id="canvas"></canvas>
    </div>
      <p id="updatePassword" type="warning">重绘</p>
  </div>
</template>
 
<script>
import Lock from "../../assets/js/gesture.js"; /* 引用签名的文件 */
export default {
  name: "gesture",
  components: {
    Lock
  },
  data() {
    return {
      title: "设置手势密码"
    };
  },
  created() {
    // this.initLock();
  },
  activated() {
    this.initLock();
  },
  computed: {},
  mounted() {},
  methods: {
    initLock() {
      this.title = window.localStorage.getItem("passwordxx")
        ? "修改手势密码"
        : "设置手势密码"; //判断显示的title
      const canvas = document.getElementById("canvas");
      this.lock = new Lock(canvas);
      this.lock.init();
    }
  }
};
</script>
<style lang="scss" scoped>
.gesture {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
}
.header-box {
  position: relative;
  text-align: center;
  font-size: 17px;
  background: #fff;
  color: $header-color;
  line-height: 50px;
  img {
    position: absolute;
    left: 15px;
    width: 15px;
    height: 15px;
    padding: 10px;
    @extend %po-valign;
  }
}
#title {
  position: absolute;
  width: 100%;
  margin-top: 80px;
  font-size: 16px;
  text-align: center;
  z-index: 2;
}
.canvasBox {
  position: fixed;
  z-index: 1;
  top: 200px;
  left: -4%;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  width: 100%;
  height: 100%;
  background: #fff;
  box-sizing: border-box;
} /* 签名盒子 */
canvas {
  flex: 1;
  cursor: crosshair;
} /*  */
#updatePassword {
  position: absolute;
  padding: 0 0.4rem;
  bottom: 35px;
  left: 15px;
  right: 15px;
  color: #ffffff;
  font-size: 17px;
  text-align: center;
  height: 1.17333rem;
  line-height: 1.12rem;
  border-radius: 0.08rem;
  background: linear-gradient(to bottom, #d6a956, #cca64e);
  z-index: 2;
}
</style>
