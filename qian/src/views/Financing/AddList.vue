<template>
  <div>
    <div v-if="visible" class="content-box">
      <div>
        <img class="blank-photo" src="@/assets/img/productDetailed/blankPhoto.png" alt="">
      </div>
      <div>暂无可续投产品，赶紧投资吧！</div>
      <div>
        <van-button class="button-style" type="warning">立即投资</van-button>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "addList",
  data() {
    return {
      visible: true,
      active: ""
    };
  },
  created() {},
  computed: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.content-box {
  & > div {
    text-align: center;
  }
  & > div:nth-child(1) {
    margin: 77px 0 15px 0;
  }
  & > div:nth-child(2) {
    margin-bottom: 7px;
    color: #666666;
    font-size: 13px;
  }
}
.blank-photo {
  width: 123px;
  height: 124px;
}
.button-style {
  width: 162px;
  background: #cca64e;
  border: none;
}
</style>
