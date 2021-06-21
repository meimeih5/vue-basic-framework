<!--
 * @Author : jaydon
 * @Date   : 2020-09-26 12:09
 * @WeChat : i-vshow
 * @Email  : vshow@huxiaodo.com
 * @Blog   : http://g.huxiaodo.com
-->

<template>
  <div id="app">
    <navigation>
      <transition :name="transitionName">
        <router-view />
      </transition>
    </navigation>
  </div>
</template>
<script>
export default {
  data() {
    return {
      transitionName: ''
    };
  },
  created() {
    this.$navigation.on('forward', () => (this.transitionName = 'slide-left'));
    this.$navigation.on('back', () => (this.transitionName = 'slide-right'));
  }
};
</script>
<style lang="scss"></style>
