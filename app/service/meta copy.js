/*
 * @Author: Luoxd
 * @Description: 
 * @Date: 2019-10-07 19:29:44
 * @LastEditTime: 2020-02-28 21:18:58
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
  text (htmlSpace, privateClass, publicString, value) {
    // console.log(publicCss, '-----')
    return  `${htmlSpace}<span class="${privateClass}${publicString}">${value}</span>\n`
  },
  // 生成图片组件函数
  img (htmlSpace, privateClass, publicString, value) {
    return  `${htmlSpace}<img src="${value}" class="${privateClass}${publicString}" />\n`
  }
}
module.exports = {
  getMetaData (option, htmlSpace, publicString, index) {
    const { value, css, classes, type } = option
    const hasPrivateClass = !!classes
    const privateClass = hasPrivateClass ? classes : `${Utils.classes}${option.type}`
    let suffix = hasPrivateClass ? '' : `:nth-child(${index})`
    const classInfo = { privateClass: `${privateClass}${suffix}` }

    return {
      html: META[type](htmlSpace, privateClass, publicString, value),
      css: getCSS(classInfo, css)
    }
  }
}