<!--
 * @Author : jaydon
 * @Date   : 2020-09-26 12:09
 * @WeChat : i-vshow
 * @Email  : vshow@dooomi.com
 * @Blog   : http://dooomi.com
-->

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';

export default {
  render() {
    return (
      <a-locale-provider locale={zhCN}>
        <div id="app">
          <router-view />
        </div>
      </a-locale-provider>
    );
  }
};
</script>
