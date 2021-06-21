<!--
 * @Author : jaydon
 * @Date   : 2020-09-26 12:09
 * @WeChat : i-vshow
 * @Email  : vshow@huxiaodo.com
 * @Blog   : http://g.huxiaodo.com
-->

<template>
  <div id="app">
    <v-transition-router v-if="$route.meta.transition" />
    <router-view v-else />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss"></style>
