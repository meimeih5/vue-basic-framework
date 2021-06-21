<!--
 * @Author : jaydon
 * @Date   : 2021-06-21 17:24
 * @WeChat : i-vshow
 * @Email  : vshow@huxiaodo.com
 * @Blog   : http://g.huxiaodo.com
-->

<template>
  <navigation>
    <transition :name="transitionName">
      <router-view />
    </transition>
  </navigation>
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

<style lang="scss">
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  width: 100%;
  position: absolute;
  will-change: transform;
  transition: all 0.3s ease-out;
}

.slide-right-enter {
  opacity: 0;
  transform: translate(-100%, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate(100%, 0);
}

.slide-right-leave-active,
.slide-left-leave-active {
  opacity: 0;
  transform: translate(0%, 0);
}
</style>
