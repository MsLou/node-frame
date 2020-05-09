<!--
 * @Author: 
 * @Description: 
 * @Date: 2019-10-17 15:09:28
 * @LastEditTime: 2019-10-22 17:25:53
 * @LastEditors: 
 -->
<template>
  <div class="dsda">
    <div class="block_1">
      <span class="qt_text">请填写文本1212</span>
    </div>
    <div class="block_2">
      <div class="block_3">
      </div>
      <title></title>
      <title></title>
    </div>
  </div>
</template>
<script>
import title from './title.vue'

export default {
  components: { title }
}
</script>
<style lang="less" scoped>
.dsda { background-color: #fff;height: 375px;width: 375px; }
.block_1 { height: 50px; }
.block_2 { height: 150px; }
.block_3 { height: 20px; }

// 以下是抽离的公共样式

</style>
