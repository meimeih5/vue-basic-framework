### 以下内容自动全局导入，可直接使用

<hr/>

1. component: 文件名作为组件名，使用时以 v- 开头，支持 jsx 写法

```js
<v-nav-bar :title="$t('title')" @clickBack="onClickBack"></v-nav-bar>

<v-icon name="more"></v-icon>
```

2. ant-design-vue:

```js
// 组件
<a-button type="primary">主要按钮</a-button>;

// api
this.$message('提示文案');

...
```

3. vuex:

```js
// 读取
this.vuex_loading;

// 修改
this.$vuex('vuex_loading', true);

// doui-vue
vuex.update('vuex_loading', true);
```

4. router: `页面必须为 index.vue`

```js
// 默认页面路由: 路径短杠(-)连接
1. 首页：home
2. 首页列表：home-list
3. ...

// 组件中自定义参数
export default {
  meta: {
    path: '自定义页面路径',
    title: '页面title',
    transition: true, // 默认为true
    ...
  },
}
```

5. api:

```js
this.$login();
this.$http.get();
...
```

6. util:

```js
// local-storage
this.$ls();

// dayjs
this.$dayjs();

// cookie
this.$cookie();

// event
this.$event.$on();
this.$event.$emit();

// lodash
this.$d.map();
this.$d.find();
this.$d.cloneDeep();

// 自定义
this.$customUtil();

...
```

7. scss: 内置 class，变量注入

```css
.d-rela .d-flex .d-flex-1 .d-text-left .d-font-10 .d-m-10 .d-p-10 ...;
```

```js
// js
this.$themes.black;

// scss
color: $black;
```

8. 自定义 directive:

```js
<component v-click-outside="onClickOutside"></component>
```

9. vue-styled-components:

```js
const Title = styled.div`
  color: ${props => props.color};
`;

<Title color="red">Title</Title>;

// 全局注册后
<v-title color="red">Title</v-title>;
```
