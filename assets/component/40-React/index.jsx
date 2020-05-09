'use strict';

import React, { Component } from 'react';
import bigItem from './bigItem.jsx'
import './style.css';

class Page extends Component {
  render() {
    return (
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
    );
  }
}
export default Page;
