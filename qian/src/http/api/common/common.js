import axios from "@/http/http"; //导入创建好的axios实例

export default {
  //获取轮播图
  sendImage(file) {
    return axios.post(`/api/a/upload-picture`, file);
  }
};
