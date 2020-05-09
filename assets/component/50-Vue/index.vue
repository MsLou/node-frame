<!--
 * @Author: 
 * @Description: 
 * @Date: 2019-10-17 15:09:28
 * @LastEditTime: 2019-10-22 17:25:53
 * @LastEditors: 
 -->
<template>
  <div class="aaa block_1 ">
    <box></box>
    <div class="box">
      <title></title>
    </div>
  </div>
</template>
<script>
import box from './box.vue'
import title from './title.vue'
export default {
  name: '',
  components: {box, title},
  created () {},
  mounted () {}
}
</script>
<style lang="less" scoped>
  .aaa span { display: inline-block; }
  .aaa { height:375px;width:375px;
    .box { height:100px;width:100px;background:#fff; }

  }
</style>
