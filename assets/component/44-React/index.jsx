'use strict';

import React, { Component } from 'react';
import './style.css';

class Page extends Component {
  render() {
    return (
    <div class="test block_1">
      <div class="bigItem block_2">
        <div class="item-img">
          <img src="https://fakeimg.pl/375x200/" class="qt_img" />
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
    </div>
    );
  }
}
export default Page;
