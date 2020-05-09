<!--
 * @Author: 
 * @Description: 
 * @Date: 2019-10-17 15:09:28
 * @LastEditTime: 2019-10-22 17:25:53
 * @LastEditors: 
 -->
<template>
  <div class="test">
    <div class="block_1">
      <bigItem></bigItem>
    </div>
    <div class="block_2">
      <bigItem></bigItem>
    </div>
    <div class="block_3">
      <bigItem></bigItem>
    </div>
  </div>
</template>
<script>
import bigItem from './bigItem.vue'

export default {
  components: { bigItem }
}
</script>
<style lang="less" scoped>
.test { background-color: #fff;height: 1075px;width: 375px; }
.block_1 { height: 375px; }
.block_2 { height: 375px; }
.block_3 { height: 375px; }

// 以下是抽离的公共样式

</style>
