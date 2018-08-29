<template>
  <div class="login-input">
    <form>
      <label for="username"></label>
      <input type="text" id="username">
      <label for="password"></label>
      <input type="text" id="password">
    </form>
  </div>
</template>
<script>
export default {
  name: "LoginInput"
};
</script>
<style lang="scss" scoped>
.login-input {
  margin-top: 10px;
}
</style>
