<template>
  <div class="me">
    <me-header :user="userMsg" ></me-header>
    <me-list></me-list>
    <common-footer></common-footer>
  </div>
</template>
 
<script>
import MeHeader from "@/components/Me/MeHeader";
import MeList from "@/components/Me/MeList";
import CommonFooter from "common/CommonFooter";
export default {
  name: "Me",
  components: {
    MeHeader,
    MeList,
    CommonFooter
  },
  data() {
    return {};
  },
  computed: {
    userMsg() {
      let user = this.$store.state.user;
      return user;
    }
  }
};
</script>
<style lang="scss" scoped>
.me {
  padding-bottom: 60px;
}
//启动页
</style>
