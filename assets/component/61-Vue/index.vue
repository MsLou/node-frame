<!--
 * @Author: 
 * @Description: 
 * @Date: 2019-10-17 15:09:28
 * @LastEditTime: 2019-10-22 17:25:53
 * @LastEditors: 
 -->
<template>
  <div class="one-item block_1 ">
    <div class="block_2">
      <img src="http://localhost:3001/upload/425d1ebab35fb7b3.jpg.webp" class="qt_img" />
    </div>
    <div class="block_3">
      <div class="block_4">
        <span class="qt_text">旅游商品</span>
      </div>
      <div class="block_5">
        <span class="qt_text">商品副标题商品副标题商品副标题</span>
      </div>
      <div class="block_6">
        <div class="label">
          <span class="qt_text">特卖</span>
        </div>
      </div>
      <div class="block_8">
        <span class="qt_text">￥</span>
        <span class="qt_text">99.00</span>
        <span class="qt_text">109.99</span>
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
  .oneItem span { display: inline-block; }
  .one-item { width:375px;display:flex;padding:10px;
    .block_2 { width:120px;
      .qt_img:nth-child(1) { width:120px; }
    }
    .block_3 { flex:1;margin-left:10px;
      .block_4 { font-size:16px; }
      .block_5 { font-size:12px;
        .qt_text:nth-child(1) { color:grey;margin:6px 0 0 0; }
      }
      .block_6 { margin:6px 0 0 0;
        .label { display:inline-block;
          .qt_text:nth-child(1) { color:#fff;background:red;padding:0 4px; }
        }
      }
      .block_8 { position:absolute;bottom:0;
        .qt_text:nth-child(2) { color:red;font-size:16px; }
        .qt_text:nth-child(3) { text-decoration:line-through;color:grey;margin-left:6px; }
      }
    }

  }
</style>
