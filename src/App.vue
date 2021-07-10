<!--
 * @Author : jaydon
 * @Date   : 2020-09-26 12:09
 * @WeChat : i-vshow
 * @Email  : vshow@dooomi.com
 * @Blog   : http://dooomi.com
-->

<script>
export default {
  render() {
    return <div id="app">{this.$route.meta.transition ? <v-transition-router /> : <router-view />}</div>;
  }
};
</script>
