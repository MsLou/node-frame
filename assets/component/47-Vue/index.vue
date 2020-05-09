<!--
 * @Author: 
 * @Description: 
 * @Date: 2019-10-17 15:09:28
 * @LastEditTime: 2019-10-22 17:25:53
 * @LastEditors: 
 -->
<template>
  <div class="asd block_1 ">
    <div class="bigItem block_2 ">
      <div class="item-img">
        <img src="https://fakeimg.pl/375x200/" class="qt_img" />
      </div>
      <div class="item-info">
        <div class="item-name">
          <span class="name public-1">爱上看见爱上科技阿卡</span>
        </div>
        <div class="item-label">
          <span class="label public-2">特卖</span>
        </div>
        <div class="item-preice">
          <span class="qt_text">￥</span>
          <span class="qt_text public-3">99.99</span>
        </div>
      </div>
    </div>
    <div class="bigItem block_8 ">
      <div class="item-img">
        <img src="https://fakeimg.pl/375x200/" class="qt_img" />
      </div>
      <div class="item-info">
        <div class="item-name">
          <span class="name public-1">爱上看见爱上科技阿卡</span>
        </div>
        <div class="item-label">
          <span class="label public-2">特卖</span>
        </div>
        <div class="item-preice">
          <span class="qt_text">￥</span>
          <span class="qt_text public-3">99.99</span>
        </div>
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
  .asd span { display: inline-block; }
  .asd { width:375px;background:#fff;
    .bigItem { width:375px;
      .item-img { height:200px;
        .qt_img:nth-child(1) { border-radius:10px; }
      }
      .item-info { margin:10px;
        .item-name {
          .name { color:#666; }
        }
        .item-label { margin:6px 0 0 0; }
        .item-preice { margin:6px 0 0 0; }
      }
    }
    .bigItem { width:375px;
      .item-img { height:200px;
        .qt_img:nth-child(1) { border-radius:10px; }
      }
      .item-info { margin:10px;
        .item-label { margin:6px 0 0 0; }
        .item-preice { margin:6px 0 0 0; }
      }
    }
    .public-1 { font-weight:bold;font-size:16px; }
    .public-2 { color:red;border:1px solid red;padding:0 4px; }
    .public-3 { color:red;font-size:16px; }
  }
</style>
