<!--
 * @Author : jaydon
 * @Date   : 2021-06-17 19:41
 * @WeChat : i-vshow
 * @Email  : vshow@huxiaodo.com
 * @Blog   : http://g.huxiaodo.com
-->
<template>
  <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft" />
</template>

<script>
export default {
  props: ['title'],
  methods: {
    onClickLeft() {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .van-nav-bar__content {
  .van-nav-bar__text,
  .van-icon {
    color: #323233;
  }
}
</style>
