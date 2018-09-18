<template>
  <div>
    <commenHeader class="header-style" title="实名认证"></commenHeader>
    <div class="info-box">
      <div class="card-title">
        <img src="@/assets/img/verify/card.png">
        <span>上传身份证正反面</span>
      </div>
      <div class="img-preview">
        <div>
          <div v-if="font">
            <van-uploader :after-read="readOne" accept="image/gif, image/jpeg" multiple>
            <img class="cover" src="@/assets/img/verify/cover.png" alt="">
            <p>身份证正面</p>
            </van-uploader>
          </div>
          <img v-else @click="change('one')" class="img-style" :src=user.idFront alt="">
        </div>
        <div>
          <div v-if="back">
            <van-uploader :after-read="readTwo" accept="image/gif, image/jpeg" multiple>
            <img class="cover" src="@/assets/img/verify/cover.png" alt="">
            <p>身份证反面</p>
            </van-uploader>
          </div>
          <img v-else @click="change" class="img-style" :src=user.idBack alt="">
        </div>
      </div>
    </div>
    <div class="button-box">
      <van-button :disabled="disabled" @click="submit" class="button-style" type="warning">提交</van-button>
    </div>
  </div>
</template>
 
<script>
import { Toast } from "vant";
import { Dialog } from "vant";
import commenHeader from "common/CommonHeader.vue";
export default {
  name: "uploadImg",
  components: {
    commenHeader,
    Dialog
  },
  data() {
    return {
      user: {},
      disabled: true,
      font: true,
      back: true
    };
  },
  activated() {
    this.getUser();
  },
  created() {},
  computed: {},
  mounted() {},
  methods: {
    getUser() {
      this.user = JSON.parse(localStorage.getItem("user"));
      console.log(this.user);
    }, //获取身份信息
    readOne(file) {
      let form = new FormData();
      form.append("file", file.file);
      this.$api.common.sendImage(form).then(res => {
        console.log(res);
        this.user.idFront = res.data;
        this.font = false;
        console.log(this.user.idFront);
      });
      this.validator();
    } /* 正面 */,
    readTwo(file) {
      let form = new FormData();
      form.append("file", file.file);
      this.$api.common.sendImage(form).then(res => {
        console.log(res);
        this.user.idBack = res.data;
        this.back = false;
      });
      this.validator();
    }, //反面
    validator() {
      this.disabled = true;
      if (this.user.idFront != null && !!this.user.idBack != null) {
        this.disabled = false;
      }
    },
    change(val) {
      Dialog.confirm({
        title: "提示",
        message: "是否要更换图片？"
      })
        .then(() => {
          if (val == "one") {
            this.font = true;
            this.user.idFront = null;
            this.validator();
          } else {
            this.back = true;
            this.user.idBack = null;
            this.validator();
          }
        })
        .catch(() => {});
    } /* 更改是否删除图片 */,
    submit() {
      console.log(this.user);
      this.$api.setting.verify(this.user).then(res => {
        console.log(res);
        if (res.data.code == 1) {
          Toast.success("请求成功");
          this.$router.push({
            path: "/verify"
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.header-style {
  border-bottom: 1px solid #d9d9d9;
}
.info-box {
  margin-top: 10px;
  padding: 13px 16px;
  background: #fff;
}
.card-title {
  display: flex;
  align-items: center;
  padding-bottom: 13px;
  border-bottom: 1px solid #d9d9d9;
  img {
    width: 18px;
    height: 13px;
  }
  span {
    margin-left: 5px;
    font-size: 14px;
    color: #666;
  }
}
.cover {
  width: 35px;
  height: 35px;
}
.img-preview {
  display: flex;
  justify-content: space-between;
  margin-top: 13px;
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    min-width: 165px;
    min-height: 115px;
    text-align: center;
    border: 1px solid #e8e8e8;
    p {
      flex-basis: 100%;
      margin: 0;
      color: #999;
      font-size: 12px;
    }
  }
}
.button-box {
  margin-top: 30px;
  padding: 0 15px;
}
.button-style {
  width: 100%;
}
.img-style {
  max-width: 100%;
  max-height: 100%;
}
</style>
