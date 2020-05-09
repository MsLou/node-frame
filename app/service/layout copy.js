/*
 * @Author: Luoxd
 * @Description: 
 * @Date: 2019-10-02 13:16:20
 * @LastEditTime: 2020-02-28 21:18:24
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
 * 元组件style
 */
function getCSS (classes, css) {
  // if (!Object.keys(css).length) {
  //   return ''
  // }
  css = Utils.deepClone(css || {})
  let style = ''
  style += formatCSSObj(css)
  return `${classes} { ${style}`
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
const ContainerHTML = {
  start (classList, css, layoutIndex, publicString, id) {
    
    return {
      html: `<div class="${classList.join(' ')}${publicString}">\n`,
      css: getCSS(`.${classList[0]}`, css) + '\n'
    }
  },
  end: '</div>\n'
}
// Row
const RowHTML = {
  start (classes, css, layoutIndex, publicString, id) {
    const classInfo = getClass(layoutIndex)
    return {
      html: `<div class="${classes}${publicString}">\n`,
      css: getCSS(`.${classes}`, css) + '\n'
    }
  },
  end: '</div>\n'
}

// function formatStyle (css) {
//   let styles = []
//   Object.keys(css).forEach(key => {
//     css[key] ? styles.push(`${key}: ${css[key]}`) : null
//   })
//   return styles.length ? ` style="${styles.join(';')}"` : ''
// }

module.exports = {
  ContainerHTML,
  RowHTML,
}