'use strict';

import React, { Component } from 'react';
import bigItem from './bigItem.jsx'
import oneItem from './oneItem.jsx'
import './style.css';

class Page extends Component {
  render() {
    return (
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
        <bigItem></bigItem>
        <oneItem></oneItem>
      </div>
    );
  }
}
export default Page;
