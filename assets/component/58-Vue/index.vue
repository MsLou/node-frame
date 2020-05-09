<!--
 * @Author: 
 * @Description: 
 * @Date: 2019-10-17 15:09:28
 * @LastEditTime: 2019-10-22 17:25:53
 * @LastEditors: 
 -->
<template>
  <div class="bigItem block_1 ">
    <div class="item-img">
      <img src="http://localhost:3001/upload/750x340-2.jpg" class="qt_img" />
    </div>
    <div class="item-info">
      <div class="item-name">
        <span class="name">爱上看见爱上科技阿卡</span>
      </div>
      <div class="item-label">
        <span class="label">特卖</span>
      </div>
      <div class="item-preice">
        <span class="qt_text">￥</span>
        <span class="qt_text">99.99</span>
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
  .bigItem span { display: inline-block; }
  .bigItem { width:375px;
    .item-img {
      .qt_img:nth-child(1) { border-radius:10px; }
    }
    .item-info { margin:10px;
      .item-name {
        .name { font-weight:bold;font-size:16px; }
      }
      .item-label { margin:6px 0 0 0;
        .label { color:red;border:1px solid red;padding:0 4px; }
      }
      .item-preice { margin:6px 0 0 0;
        .qt_text:nth-child(2) { color:red;font-size:16px; }
      }
    }

  }
</style>
