<template>
  <div>
    <div>
      <CommonHeader :title=title></CommonHeader>
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
      // banner: ""
    };
  },
  created() {
    // this.getBanner();
  },
  computed: {
    banner() {
      return this.$route.query.cover;
    },
    title() {
      return this.$route.query.title;
    }
  },
  mounted() {},
  methods: {
    // getBanner() {
    //   let id = this.$route.query.id;
    //   this.$api.commend.getBanner(id).then(res => {
    //     this.banner = res.data.data.content;
    //   });
    // }
  }
};
</script>
<style lang="scss" scoped>
.banner-style {
  max-width: 100%;
  max-height: 100%;
}
</style>
