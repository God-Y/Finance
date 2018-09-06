<template>
  <div>
    <div id="canvasBox" >
    <div class="hint">温馨提示：请在以下白色区域内手写签名。</div>
    <canvas></canvas>
    </div>
      <div class="greet">
        <van-button @click="cancel" type="danger">取消</van-button>
        <van-button @click="clear" @mousedown="clear" type="warning">清除</van-button>
        <van-button @click="upload" @mousedown="upload" type="primary">确定</van-button>
      </div>
  </div>
</template>
 
<script>
import Draw from "../../../assets/js/draw.js"; /* 引用签名的文件 */
import { Toast } from "vant";
import { Dialog } from "vant";
export default {
  name: "signatrue",
  components: {
    Draw
  },
  data() {
    return {
      degree: 0, // 屏幕整体旋转的角度, 可取 -90,90,180等值,
      file: ""
    };
  },
  created() {},
  mounted() {
    this.canvasBox = document.getElementById("canvasBox");
    this.initCanvas();
  },
  computed: {},
  methods: {
    initCanvas() {
      const canvas = document.querySelector("canvas");
      this.draw = new Draw(canvas, -this.degree);
    },
    //初始化canvas画布，支持手写，并重置坐标系
    clear() {
      this.draw.clear();
    },
    //清除
    cancel() {
      Dialog.confirm({
        title: "提示",
        message: "确认取消签名吗？"
      })
        .then(() => {
          // on confirm
          this.$router.go(-1);
        })
        .catch(() => {
          // on cancel
        });
    },
    upload() {
      let img = this.draw.getPNGImage();

      let blob = this.draw.dataURLtoBlob(img);
      console.log(blob.size);
      if (blob.size === 18011) {
        Toast.fail("请签字！再确定");
        return false;
      } /* 如果没有值提示 */
      let form = new FormData();
      form.append("file", blob, "blob.png"); /* 把blob加入formdata对象中 */

      this.$api.common.sendImage(form).then(res => {
        let image = res.data;
        if (res.status === 200) {
          sessionStorage.setItem("url", JSON.stringify(image));
          this.$router.go(-1);
        } /* 返回上一页 */
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#canvasBox {
  position: fixed;
  top: 50px;
  left: 0;
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
.hint {
  padding: 7px 13px;
  margin-top: 5px;
  font-size: 10px;
  color: #333;
  font-family: MicrosoftYaHei;
  background: #fef0da;
} /* 提示信息 */
.greet {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  line-height: 60px;
  background: #fff;
  border-top: 1px solid #d9d9d9;
  user-select: none;
  z-index: 1;
} /* 按钮组 */
.van-button {
  width: 102px;
} /* 按钮 */
canvas {
  flex: 1;
  cursor: crosshair;
} /*  */
</style>
