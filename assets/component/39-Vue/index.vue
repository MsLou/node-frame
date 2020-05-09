<!--
 * @Author: 
 * @Description: 
 * @Date: 2019-10-17 15:09:28
 * @LastEditTime: 2019-10-22 17:25:53
 * @LastEditors: 
 -->
<template>
  <div class="as qt_container">
    <div class="block_1">
      <span class="qt_text">请填写文本</span>
      <span class="qt_text">请填写文本</span>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
.qt_container span { display: inline-block; }

.as { background-color: #fff;display: flex; }
.block_1 { background-color: #fff;width: 150px; }

// 以下是抽离的公共样式
.public-1 { margin:10px;padding:0 0 10px 0; }
.public-2 { font-size:16px;font-weight:bold; }
.public-3 { color:red;font-size:16px; }
.public-4 { color:grey;margin:0 0 0 8px; }
.public-5 { color:#fff;background:red;padding:0 4px; }
.public-6 { color:#fff;background:#f00; }
</style>
