<template>
  <div>
    <commenHeader class="header-style" title="合同详情"></commenHeader>
    <router-view></router-view>
  </div>
</template>
 
<script>
import commenHeader from "../../../components/common/CommonHeader.vue";
export default {
  name: "compactOne",
  components: {
    commenHeader
  },
  data() {
    return {};
  },
  created() {},
  computed: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.header-style {
  border-bottom: 1px solid #d9d9d9;
}
</style>
