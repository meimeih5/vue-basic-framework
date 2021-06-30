<!--
 * @Author : jaydon
 * @Date   : 2021-06-18 22:46
 * @WeChat : i-vshow
 * @Email  : vshow@dooomi.com
 * @Blog   : http://g.huxiaodo.com
-->

<template>
  <v-nav-bar :title="$t('title')" @clickBack="onClickLeft"></v-nav-bar>
</template>

<script>
export default {
  meta: {
    path: '/',
    title: '首页'
  },
  async created() {
    // const res = await this.$getGoodsDetail({ goodsId: 'c74bab3130f448a988d2f1f9b5fd0c23' });
    // console.log(res, '---res----');
  },
  methods: {
    onClickLeft() {
      console.log('clickBack');
    }
  }
};
</script>

<style lang="scss" scoped></style>
