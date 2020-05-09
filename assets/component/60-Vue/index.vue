<!--
 * @Author: 
 * @Description: 
 * @Date: 2019-10-17 15:09:28
 * @LastEditTime: 2019-10-22 17:25:53
 * @LastEditors: 
 -->
<template>
  <div class="three-item block_1 ">
    <div class="block_2">
      <img src="http://localhost:3001/upload/425d1ebab35fb7b3.jpg.webp" class="qt_img" />
    </div>
    <div class="block_3">
      <div class="block_4">
        <span class="name">旅游商品</span>
      </div>
      <div class="block_5">
        <span class="qt_text">商品利益点</span>
      </div>
      <div class="block_6">
        <span class="qt_text">￥</span>
        <span class="qt_text">99.99</span>
        <span class="qt_text">199.99</span>
      </div>
    </div>
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
  .threeItem span { display: inline-block; }
  .three-item { width:113px;padding:0 0 8px 0;
    .block_2 { height:113px; }
    .block_3 { margin:8px;
      .block_4 {
        .name { font-weight:bold;font-size:14px; }
      }
      .block_5 {
        .qt_text:nth-child(1) { color:grey;margin:6px 0 0 0; }
      }
      .block_6 { overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
        .qt_text:nth-child(2) { font-size:14px;color:red; }
        .qt_text:nth-child(3) { color:grey;margin-left:6px;text-decoration:line-through; }
      }
    }

  }
</style>
