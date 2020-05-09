/*
 * @Author: Luoxd
 * @Description: 
 * @Date: 2019-10-07 19:29:44
 * @LastEditTime: 2020-03-12 17:20:36
 * @LastEditors: Luoxd
 */
/**
 * 元组件
 */
const Utils = require('../utils')

/**
 * 元组件class
 */
function getClass (option, containerClass, metaIndex) {
  const { type, classes } = option
  return {
    privateClass: classes || `${Utils.classes}${type}-${metaIndex}`,
    componentClass: `${containerClass}-${type}`
  }
}
/**
 * css对象转字符串
 * @param {*} css 
 */
function formatCSSObj (css) {
  let cssCode = []
  Object.keys(css).forEach(key => {
    if (key && css[key]) {
      cssCode.push(`${key}: ${css[key]};`)
    }
  })
  return cssCode.join('')
  // return JSON.stringify(css).replace(/[\{\}|\"|\n]/g, '').replace(/:/g, ': ').split(',').join(';')
}
/**
 * 元组件style
 */
function getCSS (classInfo, css) {
  if (!Object.keys(css).length) {
    return ''
  }
  css = Utils.deepClone(css || {})
  let style = `${classInfo.componentClass ? '.' + classInfo.componentClass : ''}.${classInfo.privateClass} { ${formatCSSObj(css)}`
  // style += formatCSSObj(css)
  return style + ' }\n'
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

const META = {
  // 生成文本组件函数,接受一个option为参数
  text (privateClass, publicString, value) {
    return  `<span class="${privateClass}${publicString}">${value}</span>\n`
  },
  // 生成图片组件函数
  img (privateClass, publicString, value) {
    return  `<img src="${value}" class="${privateClass}${publicString}" />\n`
  },
  // 链接组件
  a (privateClass, publicString, value, data) {
    console.log(data)
    return  `<a class="${privateClass}${publicString}" href="${data.href}"${data.target ? ` target="${data.target}"` : ''}>${value}</a>\n`
  },
  // 链接组件
  input (privateClass, publicString, value) {
    return  `<input class="${privateClass}${publicString}" value="${value}" />\n`
  },
}
module.exports = {
  getMetaData (data, publicString, index) {
    const { value, classes, type } = data
    const hasPrivateClass = !!classes
    const privateClass = hasPrivateClass ? classes : `${Utils.classes}${type}`

    return META[type](privateClass, publicString, value, data)
  }
}