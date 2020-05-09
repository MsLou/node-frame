<!--
 * @Author: 
 * @Description: 
 * @Date: 2019-10-17 15:09:28
 * @LastEditTime: 2019-10-22 17:25:53
 * @LastEditors: 
 -->
<template>
  <div class="two-item block_1 ">
    <div class="item-img">
      <img src="http://localhost:3001/upload/425d1ebab35fb7b3.jpg.webp" class="qt_img" />
    </div>
    <div class="item-info">
      <div class="itme-name">
        <span class="name">旅游商品</span>
      </div>
      <div class="item-subtitle">
        <span class="subtitle">商品利益点</span>
      </div>
      <div class="item-label">
        <div class="label">
          <span class="qt_text">特卖</span>
        </div>
      </div>
      <div class="itme-price">
        <span class="qt_text">￥</span>
        <span class="qt_text">99.99</span>
        <span class="qt_text">109.9</span>
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
  .twoItem span { display: inline-block; }
  .two-item { padding:0 0 6px 0;width:172px;
    .item-img { height:172px; }
    .item-info { margin:10px;
      .itme-name {
        .name { font-size:16px;font-weight:bold; }
      }
      .item-subtitle {
        .subtitle { color:grey;margin:6px 0 0 0; }
      }
      .item-label { margin:6px 0 0 0;
        .label { display:inline-block;
          .qt_text:nth-child(1) { color:#fff;background:red;padding:0 4px; }
        }
      }
      .itme-price {
        .qt_text:nth-child(2) { font-size:16px;color:red; }
        .qt_text:nth-child(3) { text-decoration:line-through;color:grey; }
      }
    }

  }
</style>
