<!--
 * @Author : jaydon
 * @Date   : 2021-06-18 22:46
 * @WeChat : i-vshow
 * @Email  : vshow@dooomi.com
 * @Blog   : http://dooomi.com
-->

<template>
  <div>
    <d-button @click="handleAdd">新增</d-button>
    <d-button @click="handleEdit">编辑</d-button>
  </div>
</template>

<script>
const fetch = form => {
  console.log('请求开始: ', form);
  return new Promise(resolve =>
    setTimeout(() => {
      resolve();
      console.log('请求结束');
    }, 2000)
  );
};

export default {
  meta: {
    path: '/',
    title: '首页'
  },
  methods: {
    refresh() {
      console.log('刷新');
    },
    openModal({ title, onOk, value }) {
      this.$openModal({
        title,
        content: <v-form ref="form" value={value} />,
        onOk: () => this.$refs.form.submit().then(onOk).then(this.refresh)
      });
    },
    handleAdd() {
      this.openModal({
        title: '新增',
        onOk: () => this.$getGoodsDetail({ goodsId: 'c74bab3130f448a988d2f1f9b5fd0c23' })
      });
    },
    handleEdit() {
      this.openModal({
        title: '编辑',
        value: {
          user: 'user',
          password: 'password'
        },
        onOk: fetch
      });
    }
  }
};
</script>
