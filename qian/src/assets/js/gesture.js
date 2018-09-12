function H5lock(canvas, obj = {}) {
  console.log("是否被调用？");
  this.height = obj.height;
  this.width = obj.width;
  this.chooseType =
    Number(window.localStorage.getItem("chooseType")) || obj.chooseType; //chooseType 是定制有多少个点
  this.devicePixelRatio = window.devicePixelRatio || 1; //设备像素比？

  let { width, height } = window.getComputedStyle(canvas, null);
  // console.log(canvas);
  width = width.replace("px", "");
  height = height.replace("px", "");
  // console.log(width, height);

  this.canvas = canvas;
  this.ctx = canvas.getContext("2d"); //获取2d上下文
  this.width = width;
  this.height = height;
  // const context = this.context;

  // 根据设备像素比优化canvas绘图
  const devicePixelRatio = window.devicePixelRatio;
  if (devicePixelRatio) {
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.height = height * devicePixelRatio;
    canvas.width = width * devicePixelRatio;
    // context.scale(devicePixelRatio, devicePixelRatio);
  } else {
    canvas.width = width;
    canvas.height = height;
  }
}

H5lock.prototype.drawCle = function(x, y) {
  // 初始化解锁密码面板 小圆圈
  this.ctx.strokeStyle = "#87888a"; //密码的点点默认的颜色,描边颜色
  this.ctx.lineWidth = 2; // 圆点的宽度
  this.ctx.beginPath(); //开始绘制新路径
  this.ctx.arc(
    x,
    y,
    this.r,
    0,
    Math.PI * 2,
    true
  ); /* 弧线半径this.r，绘制圆圈 */
  this.ctx.closePath();
  this.ctx.stroke(); //描边路径
};
H5lock.prototype.drawPoint = function(style) {
  // 初始化圆心
  for (let i = 0; i < this.lastPoint.length; i++) {
    //lastPoint 哪来的？
    this.ctx.fillStyle = style;
    this.ctx.beginPath();
    this.ctx.arc(
      this.lastPoint[i].x,
      this.lastPoint[i].y,
      this.r / 2.5,
      0,
      Math.PI * 2,
      true
    );
    this.ctx.closePath();
    this.ctx.fill(); //fill() 方法填充当前的图像（路径）。默认颜色是黑色。使用 fillStyle 属性来填充另一种颜色/渐变。
  }
};
H5lock.prototype.drawStatusPoint = function(type) {
  // 初始化状态线条，绘制时的圆圈样式
  for (let i = 0; i < this.lastPoint.length; i++) {
    this.ctx.strokeStyle = type;
    this.ctx.beginPath();
    this.ctx.arc(
      this.lastPoint[i].x,
      this.lastPoint[i].y,
      this.r,
      0,
      Math.PI * 2,
      true
    );
    this.ctx.closePath();
    this.ctx.stroke(); //描绘路径
  }
};
H5lock.prototype.drawLine = function(style, po) {
  //style:颜色 解锁轨迹，解锁时的线条！线条！
  this.ctx.beginPath();
  this.ctx.strokeStyle = style;
  this.ctx.lineWidth = 3;
  this.ctx.moveTo(this.lastPoint[0].x, this.lastPoint[0].y); //moveto把路径移动到指定点，不创建线条

  for (let i = 1; i < this.lastPoint.length; i++) {
    this.ctx.lineTo(this.lastPoint[i].x, this.lastPoint[i].y);
  }
  this.ctx.lineTo(po.x, po.y); //上一点开始绘制一条直线 x 至 y
  this.ctx.stroke();
  this.ctx.closePath();
};
H5lock.prototype.createCircle = function() {
  // 创建解锁点的坐标，根据canvas的大小来平均分配半径

  // let n = this.chooseType; //参数配置中的每行个数
  let n = 3; //参数配置中的每行个数
  let count = 0;
  this.r = this.ctx.canvas.width / (1 + 4 * n); // 公式计算
  this.lastPoint = []; //lastPoint保存正确的圈圈路径
  this.arr = [];
  this.restPoint = []; //restPoint保存全部圈圈去除正确路径之后剩余的
  let r = this.r;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      count++;
      let obj = {
        x: j * 4 * r + 3 * r,
        y: i * 4 * r + 3 * r,
        index: count
      };
      this.arr.push(obj);
      this.restPoint.push(obj);
    }
  }
  this.ctx.clearRect(
    0,
    0,
    this.ctx.canvas.width,
    this.ctx.canvas.height
  ); /* 清除矩形区域 */
  for (let i = 0; i < this.arr.length; i++) {
    this.drawCle(this.arr[i].x, this.arr[i].y); //绘制解锁面板
  }
  //return arr;
};
H5lock.prototype.getPosition = function(e) {
  // 获取touch点相对于canvas的坐标
  let rect = e.currentTarget.getBoundingClientRect(); //获取touch点上下左右相对于浏览器视窗的位置，
  let po = {
    x: (e.touches[0].clientX - rect.left) * this.devicePixelRatio,
    y: (e.touches[0].clientY - rect.top) * this.devicePixelRatio
  };
  return po;
};
H5lock.prototype.update = function(po) {
  // 核心变换方法在touchmove时候调用
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

  for (let i = 0; i < this.arr.length; i++) {
    // 每帧先把面板画出来
    this.drawCle(this.arr[i].x, this.arr[i].y);
  }

  this.drawPoint("#27AED5"); // 每帧花轨迹
  this.drawStatusPoint("#27AED5"); // 每帧花轨迹

  this.drawLine("#27AED5", po, this.lastPoint); // 每帧画圆心

  // if (this.lastPoint.length == 4) {
  //     // debugger
  // }

  for (let i = 0; i < this.restPoint.length; i++) {
    if (
      Math.abs(po.x - this.restPoint[i].x) < this.r &&
      Math.abs(po.y - this.restPoint[i].y) < this.r
    ) {
      this.drawPoint(this.restPoint[i].x, this.restPoint[i].y);
      this.lastPoint.push(this.restPoint[i]);
      this.restPoint.splice(i, 1);
      break;
    }
  }
};
H5lock.prototype.checkPass = function(psw1, psw2) {
  // 检测密码
  let p1 = "",
    p2 = "";
  for (let i = 0; i < psw1.length; i++) {
    p1 += psw1[i].index + psw1[i].index;
  }
  for (let i = 0; i < psw2.length; i++) {
    p2 += psw2[i].index + psw2[i].index;
  }
  return p1 === p2;
};
H5lock.prototype.storePass = function(psw) {
  // touchend结束之后对密码和状态的处理

  if (this.pswObj.step == 1) {
    //第二次绘制 确认
    console.log("第二次确认，绘制");
    if (this.checkPass(this.pswObj.fpassword, psw)) {
      this.pswObj.step = 2;
      this.pswObj.spassword = psw;
      document.getElementById("title").innerHTML = "密码保存成功";

      this.drawStatusPoint("#2CFF26");
      this.drawPoint("#2CFF26");
      window.localStorage.setItem(
        "passwordxx",
        JSON.stringify(this.pswObj.spassword)
      );
      window.localStorage.setItem("chooseType", this.chooseType);
    } else {
      document.getElementById("title").innerHTML = "两次不一致，重新输入";
      this.drawStatusPoint("red");
      this.drawPoint("red");
      delete this.pswObj.step;
    }
  } else if (this.pswObj.step == 2) {
    console.log("第三步，绘制解锁密码");
    if (this.checkPass(this.pswObj.spassword, psw)) {
      let title = document.getElementById("title");
      title.style.color = "#2CFF26";
      title.innerHTML = "解锁成功";

      this.drawStatusPoint("#2CFF26"); //小点点外圈高亮
      this.drawPoint("#2CFF26");
      this.drawLine(
        "#2CFF26",
        this.lastPoint[this.lastPoint.length - 1],
        this.lastPoint
      ); // 每帧画圆心
      return new Promise(resolve => {
        setTimeout(() => {
          resolve("success");
        });
      });
    } else if (psw.length < 4) {
      this.drawStatusPoint("red");
      this.drawPoint("red");
      this.drawLine(
        "red",
        this.lastPoint[this.lastPoint.length - 1],
        this.lastPoint
      ); // 每帧画圆心
      let title = document.getElementById("title");
      title.style.color = "red";
      title.innerHTML = "请连接4个点";
    } else {
      this.drawStatusPoint("red");
      this.drawPoint("red");
      this.drawLine(
        "red",
        this.lastPoint[this.lastPoint.length - 1],
        this.lastPoint
      ); // 每帧画圆心

      let title = document.getElementById("title");
      title.style.color = "red";
      title.innerHTML = "密码错误，您还可以输入N次";
    } //可以在这里添加计数器，设置密码错误的次数
  } else {
    //
    console.log("第一次初始化绘制");
    if (psw.length < 4) {
      console.log("首次输入不能小于4个点");
      this.drawStatusPoint("red");
      this.drawPoint("red");
      this.drawLine(
        "red",
        this.lastPoint[this.lastPoint.length - 1],
        this.lastPoint
      ); // 每帧画圆心

      let title = document.getElementById("title");
      title.style.color = "red";
      title.innerHTML = "请至少连接4个点";
      return false;
    } else {
      this.pswObj.step = 1;
      this.pswObj.fpassword = psw;
      document.getElementById("title").innerHTML = "再次绘制图案进行确认";
      console.log(document.getElementById("title"));
    }
  }
};
H5lock.prototype.makeState = function() {
  //已经设置过密码，等待解锁
  if (this.pswObj.step == 2) {
    document.getElementById("updatePassword").style.display = "block";
    let title = document.getElementById("title");
    title.style.color = "#87888a";
    title.innerHTML = "请解锁";
  } else if (this.pswObj.step == 1) {
    document.getElementById("updatePassword").style.display = "block";
  } else {
    document.getElementById("updatePassword").style.display = "none";
  }
};
H5lock.prototype.setChooseType = function(type) {
  this.chooseType = type;
  this.init();
};
H5lock.prototype.updatePassword = function() {
  console.log("重置密码");
  window.localStorage.removeItem("passwordxx");
  window.localStorage.removeItem("chooseType");
  this.pswObj = {};
  document.getElementById("title").innerHTML = "绘制解锁图案";
  this.reset();
};
H5lock.prototype.initDom = function() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve("Async Hello world");
    }, 16);
  });
};
H5lock.prototype.init = function() {
  //初始化函数
  console.log("每次载入调用初始化函数，this");
  console.log(this.width);
  this.initDom().then(value => {
    console.log(value);
  }); //创建dom节点
  this.pswObj = window.localStorage.getItem("passwordxx")
    ? {
        step: 2, //step是用来记录到哪一个步骤
        spassword: JSON.parse(window.localStorage.getItem("passwordxx"))
      }
    : {};
  this.lastPoint = [];
  this.makeState(); //判断显示title
  this.touchFlag = false;
  // this.canvas = document.getElementById("canvas");
  // this.ctx = this.canvas.getContext("2d"); //获取2d上下文
  this.createCircle(); //创建九宫格
  this.bindEvent(); //事件绑定
};
H5lock.prototype.reset = function() {
  this.makeState(); //
  this.createCircle(); //重新绘制九宫格
};
H5lock.prototype.bindEvent = function() {
  console.log("bindEvnet中的this↓");
  console.log(this);
  let self = this;
  this.canvas.addEventListener(
    "touchstart",
    function(e) {
      e.preventDefault(); // 某些android 的 touchmove不宜触发 所以增加此行代码
      let po = self.getPosition(e);

      for (let i = 0; i < self.arr.length; i++) {
        if (
          Math.abs(po.x - self.arr[i].x) < self.r &&
          Math.abs(po.y - self.arr[i].y) < self.r
        ) {
          self.touchFlag = true;
          self.drawPoint(self.arr[i].x, self.arr[i].y);
          self.lastPoint.push(self.arr[i]);
          self.restPoint.splice(i, 1);
          break;
        }
      }
    },
    false
  );
  this.canvas.addEventListener(
    "touchmove",
    function(e) {
      if (self.touchFlag) {
        self.update(self.getPosition(e));
      }
    },
    false
  );
  this.canvas.addEventListener(
    "touchend",
    function() {
      if (self.touchFlag) {
        self.touchFlag = false;
        self.storePass(self.lastPoint);
        // .then(value => {
        //   if (value == "success") {
        //     self.updatePassword();
        //   }
        // });
        setTimeout(function() {
          self.reset();
        }, 1000);
      }
    },
    false
  );

  document
    .getElementById("updatePassword")
    .addEventListener("click", function() {
      self.updatePassword();
    });
};
export default H5lock;
