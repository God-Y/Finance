<template>
  <div>
    <commenHeader class="header-style" :title=name></commenHeader>
    <router-view></router-view>
  </div>
</template>
 
<script>
import commenHeader from "../../components/common/CommonHeader.vue";
export default {
  name: "count",
  components: {
    commenHeader
  },
  data() {
    return {
      name: "" /* title name */
    };
  },
  created() {
    this.name = this.$route.query.name;
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.header-style {
  border-bottom: 1px solid #d9d9d9;
} /* 页眉 */
</style>
