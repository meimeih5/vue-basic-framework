<!--
 * @Author : jaydon
 * @Date   : 2021-06-19 00:20
 * @WeChat : i-vshow
 * @Email  : vshow@huxiaodo.com
 * @Blog   : http://g.huxiaodo.com
-->

<template>
  <div>登录</div>
</template>

<script>
export default {
  async created() {
    const token = await this.$login();
    this.$ls('token', token);
    this.$router.push('/home');
  }
};
</script>

<style lang="scss" scoped></style>
