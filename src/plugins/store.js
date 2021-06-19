/*
 * @Author : jaydon
 * @Date   : 2020-09-26 12:04
 * @WeChat : i-vshow
 * @Email  : vshow@huxiaodo.com
 * @Blog   : http://g.huxiaodo.com
 */

import Vue from 'vue';
import Vuex, { mapState } from 'vuex';
import _ from 'lodash';
import ls from 'local-storage';

Vue.use(Vuex);

// 需要永久存储在state中的变量名
const saveStateKeys = ['vuex_common'];

// 加上vuex_前缀，是防止变量名冲突，也让人一目了然
const initialState = {
  vuex_loading: false,
  vuex_common: {
    language: 'zh-CN'
  }
};

const state = _.merge(initialState, ls('saveState'));

const setState = (state, { key, value }) => {
  const saveKey = key.split('.')[0];

  _.set(state, key, value);

  if (saveStateKeys.includes(saveKey)) {
    const saveState = ls('saveState') || {};

    ls('saveState', {
      ...saveState,
      [saveKey]: state[saveKey]
    });
  }
};

const store = new Vuex.Store({
  state,
  mutations: {
    setState
  }
});

const $vuex = (key, value) => store.commit('setState', { key, value });

Vue.mixin({
  created() {
    this.$vuex = $vuex;
  },
  computed: {
    // 将vuex的state中的所有变量，解构到全局混入的mixin中
    ...mapState(Object.keys(state))
  }
});

export { state, store, $vuex };
