<template>
  <div>
    <div class="input-area">
      <textarea maxlength=50 @input="addressInput" v-model="data.address" class="input-style" type="area" placeholder="请输入地址"></textarea>
      <span  class="wordCount">{{count}}/50</span>
    </div>
    <div class="button-box">
      <van-button :disabled=showButton @click="submit" class="button-style" type="warning">提交</van-button>
    </div>
  </div>
</template>
 
<script>
import { Dialog } from "vant";
import { Toast } from "vant";
export default {
  name: "changeAddress",
  components: {},
  data() {
    return {
      count: 0,
      data: {
        address: ""
      }
    };
  },
  created() {
    this.getInfo();
  },
  computed: {
    showButton() {
      if (this.count > 0) {
        return false;
      } else {
        return true;
      }
    } //按钮显示
  },
  mounted() {},
  methods: {
    getInfo() {
      this.$api.setting.getSetting().then(res => {
        this.data.address = res.data.data.address;
      });
    }, //
    addressInput() {
      this.count = this.data.address.length;
    }, //输入字符
    submit() {
      Dialog.confirm({
        title: "提示",
        message: "是否修改？"
      })
        .then(() => {
          // on confirm
          console.log(this.data);
          this.$api.setting.address(this.data).then(res => {
            console.log(res);
            if (res.data.code === 1) {
              Toast.success("更新成功");
              this.$router.push({
                path: "/setting"
              });
            } else {
              Toast.fail("更新失败,请重试");
              return false;
            }
          });
        })
        .catch(() => {
          Toast.fail("已取消");
          // on cancel
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.input-area {
  position: relative;
  display: flex;
  margin-top: 15px;
  height: 85px;
  box-sizing: border-box;
}
.input-style {
  padding: 15px;
  width: 100%;
  height: 100% !important;
  resize: none;
  border: none;
  box-sizing: border-box;
}
.wordCount {
  position: absolute;
  bottom: 10px;
  right: 15px;
}
.button-box {
  margin-top: 30px;
  padding: 0 15px;
}
.button-style {
  width: 100%;
}
</style>
