<template>
  <div>
    <canvas v-if="id" class="canvas-style" :id='id'>
      <p>该浏览器不支持canvas!</p>
    </canvas>
  </div>
</template>
 
<script>
export default {
  name: "productCanvas",
  props: {
    products: {},
    id: Number,
    color: String
  },
  data() {
    return {
      canvasColor: "#DADADA"
    };
  },
  // created() {},
  computed: {},
  mounted() {
    // console.log(this.color);
    this.canvasColor = this.color;
    // console.log(this.products);
    //获取canvas元素
    // console.log(this.id);
    let canvas = document.getElementById(this.id);
    //获取一个CanvasRenderingContext2D对象，所有的绘图都通过这个对象完成
    let ctx = canvas.getContext("2d");
    let nowRange = this.products.annualizedIncome; //用于做一个临时的range

    //画布属性
    let mW = (canvas.width = 206);
    let mH = (canvas.height = 206);
    let lineWidth = 2;

    //圆属性
    let r = mH / 2; //圆心
    let cR = r - 16 * lineWidth; //圆半径

    //Sin 曲线属性
    let sX = 0;
    let axisLength = 206; //轴长
    let waveWidth = 0.015; //波浪宽度,数越小越宽
    let waveHeight = 30; //波浪高度,数越大越高
    let speed = 0.06; //波浪速度，数越大速度越快
    let xOffset = 0; //波浪x偏移量

    ctx.lineWidth = lineWidth;

    //画圈函数
    let drawCircle = () => {
      ctx.beginPath(); //起始一条路径，或重置当前路径。
      ctx.strokeStyle = this.canvasColor; //设置或返回用于笔触的颜色、渐变或模式。这里是圆圈的颜色
      ctx.arc(r, r, cR + 30, 0, 2 * Math.PI); //创建弧/曲线（用于创建圆形或部分圆）。
      ctx.stroke(); //绘制已定义的路径。
      ctx.stroke(); //绘制已定义的路径。
      ctx.arc(r, r, cR, 0, 2 * Math.PI);
      ctx.clip(); //	从原始画布剪切任意形状和尺寸的区域。
    };

    //画sin 曲线函数
    let drawSin = xOffset => {
      ctx.save(); //	保存当前环境的状态。

      let points = []; //用于存放绘制Sin曲线的点

      ctx.beginPath();
      //在整个轴长上取点
      for (let x = sX; x < sX + axisLength; x += 20 / axisLength) {
        //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
        let y = -Math.sin((sX + x) * waveWidth + xOffset);

        let dY = mH * (1 - nowRange / 100);

        points.push([x, dY + y * waveHeight]);
        ctx.lineTo(x, dY + y * waveHeight); /* 定义线条结束坐标 */
      }

      //封闭路径
      ctx.lineTo(axisLength, mH);
      ctx.lineTo(sX, mH);
      ctx.lineTo(points[0][0], points[0][1]);
      ctx.fillStyle = this.canvasColor; /* 波浪颜色 */
      ctx.fill();
      ctx.restore();
    };

    //写百分比文本函数
    let drawText = () => {
      ctx.save();
      let size = 0.3 * cR;
      ctx.font = size + "px Helvetica Neue"; //font	设置或返回文本内容的当前字体属性。
      ctx.textAlign = "center";
      ctx.fillStyle = this.canvasColor; //设置或返回用于填充绘画的颜色、渐变或模式。
      // ctx.fillText(nowRange.toFixed(2) + "%", r, r + size / 2); //居中
      ctx.fillText((nowRange * 100).toFixed(2) + "%", r, 95);

      ctx.fillStyle = "#999"; //设置或返回用于填充绘画的颜色、渐变或模式。
      ctx.font = 12 + "px Helvetica Neue"; //font	设置或返回文本内容的当前字体属性。
      ctx.fillText("预期年化", 100, 60);

      ctx.fillStyle = "#999"; //设置或返回用于填充绘画的颜色、渐变或模式。
      ctx.font = 10 + "px Helvetica Neue"; //font	设置或返回文本内容的当前字体属性。
      ctx.fillText("起购", 70, 125);

      ctx.fillText(
        this.products.startingAmount
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1,") + "元",
        60,
        145
      );
      ctx.fillText("|", 105, 145);
      ctx.fillText("期限", 140, 125);
      ctx.fillText(this.products.deadline + "个月", 140, 145);
      ctx.restore();
    };

    let render = function() {
      ctx.clearRect(0, 0, mW, mH); // 在给定的矩形内清除指定的像素。
      drawCircle();
      drawSin(xOffset);
      drawText();
      xOffset += speed; // 波浪速度~
      requestAnimationFrame(render);
      //window.requestAnimationFrame() 方法告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画。该方法使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用。
    };

    render();
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>
