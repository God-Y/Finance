import axios from "@/http/http"; //导入创建好的axios实例

export default {
  //得到信息
  getMsg() {
    return axios({
      url: "/api/u/message",
      method: "get"
    });
  },
  getImgMsg(id) {
    //获取消息中心图片
    return axios({
      url: "/api/u/message/" + id,
      method: "get"
    });
  },
  deleteImgMsg(id) {
    //用户删除平台消息
    return axios({
      url: "/api/u/message/" + id,
      method: "delete"
    });
  },
  //获取消息的小红点
  newMsg() {
    return axios({
      url: "/api/u/redCount",
      method: "get"
    });
  },
  userMsg(id) {
    //查看用户消息
    return axios({
      url: "/api/u/messageUser/" + id,
      method: "put"
    });
  },
  deleteUserMsg(id) {
    //删除用户消息
    return axios({
      url: "/api/u/messageUser/" + id,
      method: "delete"
    });
  }
};
