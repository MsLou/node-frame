<!--
 * @Author: 
 * @Description: 
 * @Date: 2019-10-17 15:09:28
 * @LastEditTime: 2019-10-22 17:25:53
 * @LastEditors: 
 -->
<template>
  <div class="component block_1 ">
    <span class="qt_text public-1">请填写文本</span>
    <a class="qt_a" href="https://juejin.im/">链接文本</a>
    <input class="qt_input" value="1212243" />
    <a class="qt_a" href="">链接文本</a>
  </div>
</template>
<script>

export default {
  name: '',
  components: {},
  created () {},
  mounted () {}
}
</script>
<style lang="less" scoped>
  .component span { display: inline-block; }
  .component { height:375px;width:375px;
    .qt_text:nth-child(1) { padding:0 4px;border-radius:4px;font-size:16px;font-weight:bold;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:60px; }
    .qt_input:nth-child(3) { background-color:#FFF;border-radius:4px;border:1px solid #DCDFE6;color:#606266;height:40px;line-height:40px;outline:0;padding:0 15px; }
    .public-1 { background-color:#f00;color:#fff; }
  }
</style>
