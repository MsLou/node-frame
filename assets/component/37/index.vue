<!--
 * @Author: 
 * @Description: 
 * @Date: 2019-10-17 15:09:28
 * @LastEditTime: 2019-10-22 17:25:53
 * @LastEditors: 
 -->
<template>
  <div class="bigItem">
    <div class="block_1">
      <img src="https://fakeimg.pl/375x200/" class="qt_img" />
    </div>
    <div class="block_2">
      <div class="block_3">
        <span class="qt_text">爱上看见爱上科技阿卡</span>
      </div>
      <div class="block_4">
        <span class="qt_text">特卖</span>
      </div>
      <div class="block_5">
        <span class="qt_text">￥</span>
        <span class="qt_text">99.99</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
.bigItem { width: 375px; }
.block_1 { height: 200px; }
.block_1 > .qt_img:nth-child(1) { border-radius: 10px; }
.block_2 { margin: 10px; }
.block_3 > .qt_text:nth-child(1) { font-weight: bold;font-size: 16px; }
.block_4 { margin: 6px 0 0 0; }
.block_4 > .qt_text:nth-child(1) { color: red;border: 1px solid red;padding: 0 4px; }
.block_5 { margin: 6px 0 0 0; }
.block_5 > .qt_text:nth-child(2) { color: red;font-size: 16px; }

// 以下是抽离的公共样式

</style>
