<template>
  <div>
    <div class="input-area">
      <textarea maxlength=50 @input="emailInput" v-model="data.email" class="input-style" type="area" placeholder="输入电子邮箱"></textarea>
      <span  class="wordCount">{{count}}/50</span>
    </div>
    <div class="button-box">
      <van-button @click="submit" class="button-style" type="warning">提交</van-button>
    </div>
  </div>
</template>
 
<script>
import { Toast } from "vant";
export default {
  name: "changeEmail",
  components: {},
  data() {
    return {
      count: 0,
      data: {
        email: ""
      }
    };
  },
  created() {},
  computed: {},
  mounted() {},
  methods: {
    emailInput() {
      this.count = this.data.email.length;
    }, //输入字符
    submit() {
      console.log(this.data);
      this.$api.setting.email(this.data).then(res => {
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
