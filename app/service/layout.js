/*
 * @Author: Luoxd
 * @Description: 
 * @Date: 2019-10-02 13:16:20
 * @LastEditTime: 2020-02-29 15:06:42
 * @LastEditors: Luoxd
 */
const Utils = require('../utils')
/**
 * 元组件class
 */
function getClass (metaIndex) {
  return {
    privateClass: `.block_${metaIndex}`,
  }
}
/**
 * css对象转字符串
 * @param {*} css 
 */
function formatCSSObj (css) {
  let cssCode = []
  const cssList = Object.keys(css)
  cssList.forEach(key => {
    if (key && css[key]) {
      cssCode.push(`${key}: ${css[key]};`)
    }
  })
  return cssCode.join('')
  // return JSON.stringify(css).replace(/[\{\}|\"|\n]/g, '').replace(/:/g, ': ').split(',').join(';')
}
function isPublicCss (id, publicCss) {
  let className = ''
  for (let key in publicCss) {
    const item = publicCss[key]
    if (item.hasOwnProperty(id)) {
      className += ' ' + key
    }
  }
  return className
}
/**
 * 布局组件
 */
// 容器html
const ContainerHTML = (classList, css, layoutIndex, publicString = '', id) => {
  return `<div class="${classList.join(' ')}${publicString}">\n`
}
// Row
const RowHTML = (classes, css, layoutIndex, publicString = '', id) => {
  const classInfo = getClass(layoutIndex)
  return `<div class="${classes}${publicString}">\n`
}

module.exports = {
  ContainerHTML,
  RowHTML,
}