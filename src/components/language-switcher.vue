<!--
 * @Author : jaydon
 * @Date   : 2021-05-13 22:29
 * @WeChat : i-vshow
 * @Email  : vshow@huxiaodo.com
 * @Blog   : http://g.huxiaodo.com
-->

<template>
  <div class="language-switcher">
    <van-action-sheet v-model="show" cancel-text="取消" :actions="languages" @select="handleSwitch" />
    <div class="language-text" @click="show = true">
      切换语言
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  computed: {
    languages() {
      const languages = [
        {
          name: '中文',
          value: 'zh-CN'
        },
        {
          name: '日本語',
          value: 'ja-JP'
        }
      ];

      languages[this.index].color = '#2979ff';
      return languages;
    }
  },
  data() {
    return {
      show: false,
      index: 0
    };
  },
  created() {
    this.index = this.$findIndex(this.languages, { value: this.vuex_common.language });
  },
  methods: {
    handleSwitch(action, index) {
      this.show = false;
      this.index = index;
      this.$i18n.locale = action.value;
      this.$vuex('vuex_common.language', action.value);
      this.$emit('change', action);
    }
  }
};
</script>

<style lang="scss" scoped></style>
