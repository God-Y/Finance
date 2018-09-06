import { Toast } from "vant";

//全局的发送请求会有一个全局的加载页
const startLoading = function() {
  Toast.loading({
    duration: 0, // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    loadingType: "spinner",
    mask: true,
    message: "加载中"
  });
};
const endLoading = function() {
  Toast.clear();
};
//这里需要一个请求数字用来合并请求
let requestCount = 0;

export function showFullLoading() {
  if (requestCount === 0) startLoading();
  requestCount++;
}
export function hideFullLoading() {
  if (requestCount <= 0) return;
  requestCount--;
  if (requestCount === 0) endLoading();
}
