<!--
 * @Author: 
 * @Description: 
 * @Date: 2019-10-17 15:09:28
 * @LastEditTime: 2019-10-22 17:25:53
 * @LastEditors: 
 -->
<template>
  <div class="asf block_1 ">
    <div class="threeItem">
      <div class="block_3">
        <img src="https://fakeimg.pl/150x200/" class="qt_img" />
      </div>
      <div class="block_4">
        <div class="block_5">
          <span class="qt_text">傲世狂妃卡说服力</span>
        </div>
        <div class="block_6">
          <span class="qt_text">￥</span>
          <span class="qt_text">99.09</span>
          <span class="qt_text">109.99</span>
        </div>
        <div class="block_7">
          <span class="qt_text">特卖</span>
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
  .asfaf span { display: inline-block; }
  .asf { width:150px;
    .threeItem { background-color:#fff;width:150px;
      .block_3 { height:200px; }
      .block_4 { margin:10px;padding:0 0 10px 0;
        .block_5 { height:30px;
          .qt_text:nth-child(1) { font-size:16px;font-weight:bold; }
        }
        .block_6 { height:30px;
          .qt_text:nth-child(2) { color:red;font-size:16px; }
          .qt_text:nth-child(3) { color:grey;margin:0 0 0 8px; }
        }
        .block_7 {
          .qt_text:nth-child(1) { color:#fff;background:red;padding:0 4px; }
        }
      }
    }

  }
</style>
