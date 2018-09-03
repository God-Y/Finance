<template>
  <div>
    <div>
      <CommonHeader title="缺少一个标题"></CommonHeader>
    </div>
    <img class="banner-style" :src=banner>
  </div>
</template>
 
<script>
import CommonHeader from "../../components/common/CommonHeader.vue";
export default {
  name: "bannerDetailed",
  components: {
    CommonHeader
  },
  data() {
    return {
      banner: ""
    };
  },
  created() {
    this.getBanner();
  },
  computed: {},
  mounted() {},
  methods: {
    getBanner() {
      let id = this.$route.query.id;
      this.$api.commend.getBanner(id).then(res => {
        this.banner = res.data.data.content;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.banner-style {
  max-width: 100%;
  max-height: 100%;
}
</style>
