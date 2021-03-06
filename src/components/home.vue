<template>
  <div id="home">
    这里是主页
    <el-button type="info" @click="backBtn">退出</el-button>
  </div>
</template>

<script>
export default {
  name: "home",
  methods: {
    backBtn() {
      window.sessionStorage.clear();
      this.$router.replace("/login");
    },
  },
};
</script>

<style scoped>
</style>