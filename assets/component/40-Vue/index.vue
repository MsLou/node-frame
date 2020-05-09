<!--
 * @Author: 
 * @Description: 
 * @Date: 2019-10-17 15:09:28
 * @LastEditTime: 2019-10-22 17:25:53
 * @LastEditors: 
 -->
<template>
  <div class="df block_0">
    <div class="threeItem">
      <div class="block_2">
        <img src="https://fakeimg.pl/150x200/" class="qt_img" />
      </div>
      <div class="block_3">
        <div class="item-title">
          <span class="qt_text">傲世狂妃卡说服力</span>
        </div>
        <div class="block_5">
          <span class="qt_text">￥</span>
          <span class="qt_text">99.09</span>
          <span class="qt_text">109.99</span>
        </div>
        <div class="block_6">
          <span class="qt_text">特卖</span>
        </div>
      </div>
    </div>
    <bigItem></bigItem>
  </div>
</template>
<script>
import bigItem from './bigItem.vue'

export default {
  components: { bigItem }
}
</script>
<style lang="less" scoped>
.df span { display: inline-block; }
.df { background-color: #fff;width: 375px; }
.threeItem { background-color: #fff;width: 150px; }
.block_2 { height: 200px; }
.block_3 { margin: 10px;padding: 0 0 10px 0; }
.item-title { height: 30px; }
.item-title > .qt_text:nth-child(0) { font-size: 16px;font-weight: bold; }
.block_5 { height: 30px; }
.block_6 > .qt_text:nth-child(1) { color: red;font-size: 16px; }
.block_6 > .qt_text:nth-child(2) { color: grey;margin: 0 0 0 8px; }
.block_7 > .qt_text:nth-child(0) { color: #fff;background: red;padding: 0 4px; }

// 以下是抽离的公共样式

</style>
