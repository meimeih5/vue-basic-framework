<!--
 * @Author : jaydon
 * @Date   : 2021-06-18 22:46
 * @WeChat : i-vshow
 * @Email  : vshow@dooomi.com
 * @Blog   : http://g.huxiaodo.com
-->

<template>
  <d-container>
    <router-link to="home-list">{{ $t('首页') }}</router-link>
  </d-container>
</template>

<script>
export default {
  meta: {
    path: '/',
    title: '首页'
  },
  async created() {
    this.$getGoodsDetail({ goodsId: 'c74bab3130f448a988d2f1f9b5fd0c23' });
  }
};
</script>
