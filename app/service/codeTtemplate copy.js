const Layout = require('./layout')
const Meta = require('./meta')
const Utils = require('../utils')

// 两个对象转成字符串对比是否相同
function ObjContrast (obj1, obj2) {
  let str1 = '', str2 = ''
  for(let key in obj1) {
    str1 += `${key}:${obj1[key]}`
    str2 += `${key}:${obj2[key]}`
  }
  return str1 === str2
}
/**
 * 抽取公共样式
 * @param {*} data 
 */
function pullAwayCss (data) {
  const format = []
  const repeatCss = {}
  let publicIdx = 1 // 公共样式class索引
  Object.keys(data).forEach(key => {
    const { css, id } = data[key]
    format.push({ classes: id, css })
  })
  
  // 一次遍历
  format.forEach((itemOne) => {
    // 二次遍历
    format.forEach(itemTwo => {
      let repeatIdx = 0 // 重复的css数量
      const temporanyCss = {} // 相同的css
      // 等于自己跳过
      if (itemOne === itemTwo) {
        return
      }
      // 遍历css
      for (let cssKey in itemTwo.css) {
        if (itemOne.css.hasOwnProperty(cssKey) && itemOne.css[cssKey] === itemTwo.css[cssKey]) {
          repeatIdx++
          temporanyCss[cssKey] = itemTwo.css[cssKey]
        }
      }
      // 超过1个相同的就要抽离class
      if (repeatIdx > 1) {
        // 判断缓存里是否已经存在class
        let isExistence = false
        let existenceClassIds = [] // 存在相同的时候缓存classid
        for (let classId in repeatCss) {
          if (ObjContrast(repeatCss[classId].css, temporanyCss)) {
            isExistence = true
            existenceClassIds.push(classId)
          }
        }
        for(let css in temporanyCss) {
          delete itemTwo.css[css]
          delete itemOne.css[css]
        }
        // if ()
        // 如果不存在，则新加入一个class
        if (!isExistence) {
          // for(let css in temporanyCss) {
          //   delete itemTwo.css[css]
          //   delete itemOne.css[css]
          // }
          repeatCss[`public-${publicIdx}`] = {
            css: temporanyCss,
            [itemOne.classes]: true,
            [itemTwo.classes]: true
          }
          publicIdx++
        }
        // 如果存在，则插入一个id标示
        else {
          existenceClassIds.forEach(classId => {
            repeatCss[classId][itemTwo.classes] = true
          })
        }
      }
      // 否则尝试去repeatCss里找是否有相同的css的class
      else {
        let isExistence = false
        let existenceClassIds = [] // 存在相同的时候缓存classid
        let temporanyCssArr = []
        for (let classId in repeatCss) {
          if (ObjContrast(repeatCss[classId].css, itemTwo.css)) {
            isExistence = true
            temporanyCssArr.push(repeatCss[classId].css)
            existenceClassIds.push(classId)
          }
        }
        if (isExistence) {
          temporanyCssArr.forEach(item => {
            for(let css in item) {
              delete itemTwo.css[css]
            }
          })
          existenceClassIds.forEach(classId => {
            repeatCss[classId][itemTwo.classes] = true
          })
        }
      }
    })
  })
  return repeatCss
}

/**
 * 
 * 解析公共样式成字符串
 */
function formatPublicCss (publicCss) {
  // const idMeta = id + '-meta'
  const cssAll = []
  let returnCss = []
  for (let key in publicCss) {
    const item = publicCss[key]
    cssAll.push({
      css: item.css,
      className: key
    })
  }
  cssAll.forEach(item => {
    returnCss.push(getCSS(
      `.${item.className}`,
      item.css
    ) + ' }')
  })
  return returnCss.join('\n')
}

/**
 * css对象转字符串
 * @param {*} css 
 */
function formatCSSObj (css) {
  let cssCode = []
  Object.keys(css).forEach(key => {
    if (key && css[key]) {
      cssCode.push(`${key}:${css[key]};`)
    }
  })
  return cssCode.join('')
}

/**
 * style
 */
function getCSS (classes, css, cssTemplate) {
  if (cssTemplate === 'css' && !Object.keys(css).length) {
    return ''
  }
  css = css || {}
  let style = ''
  style += formatCSSObj(css)
  return `${classes} { ${style}${cssTemplate === 'css' ? ' }' : ''}`
}

function getMetaCSS (classInfo, css) {
  if (!Object.keys(css).length) {
    return ''
  }
  css = Utils.deepClone(css || {})
  let style = `${classInfo.componentClass ? `.${classInfo.componentClass} > ` : ''}.${classInfo.privateClass} { ${formatCSSObj(css)}`
  return style + ' }\n'
}

function getPublicString (id, publicCss) {
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
 * less语法特殊处理
 */
function lessHandle (layout, data) {
  const cssData = {}
  const recursion = (layout) => {
    cssData[layout.id] = { css: layout.css, children: layout.children }
    if (layout.children.length) {
      layout.children.forEach(item => {
        recursion(item)
      })
    }
  }
  recursion(layout)
  return cssData
}

const authorCode = 
`<!--
 * @Author: 
 * @Description: 
 * @Date: 2019-10-17 15:09:28
 * @LastEditTime: 2019-10-22 17:25:53
 * @LastEditors: 
 -->
`
class GetComponentHtml {
  constructor (layout, data, initSpace, cssTemplate = 'less', publicCss) {
    this.componentData = data
    this.layout = layout
    this.importList = {}
    this.layoutIndex = 0
    this.metaIndex = 0
    this.level = 0
    this.publicCss = publicCss || {}
    this.CSSCode = ''
    this.space = '  '
    this.prevLayout = {}
    this.html = ''
    this.layoutClasses = ''
    this.initSpace = initSpace
    this.cssTemplate = cssTemplate
    this.init()
  }
  init () {
    const result = this.recursion(this.layout)
    this.html = result.html
    this.CSSCode = result.css
  }
  // 递归
  recursion (target) {
    let html = '', CSSCode = '', htmlSpace = '', cssSpace = ''
    const { id, children, hasQuote, quoteName } = target
    let { layoutIndex, metaIndex, level, space, componentData, initSpace } = this
    let publicString = getPublicString(id, this.publicCss)
    this.level++
    if (!htmlSpace) {
      htmlSpace = initSpace
    }
    for(let i = 0; i < level; i++) {
      htmlSpace += space
      if (this.cssTemplate === 'less') {
        cssSpace += space
      }
    }
    
    if (hasQuote) {
      this.importList[quoteName] = null
      html += `${htmlSpace}<${quoteName}></${quoteName}>\n`
      this.level--
    } else {
      const { type, css, name, classes } = componentData[id]
      switch (type) {
        case 'Container':
          this.layoutIndex++
          this.layoutClasses = classes
          const classList = [name, `block_${layoutIndex}`]
          const ContainerInfo = Layout.ContainerHTML.start(classList, css, layoutIndex, publicString, id)
          html += htmlSpace + ContainerInfo.html
          CSSCode += cssSpace + getCSS(`.${classList[0]}`, css, this.cssTemplate)
          break
        case 'Row':
          this.layoutIndex++
          this.layoutClasses = classes
          const rowClasses = classes || `block_${layoutIndex}`
          const RowInfo = Layout.RowHTML.start(rowClasses, css, layoutIndex, publicString, id)
          html += htmlSpace + RowInfo.html
          const classStr = getCSS(`.${rowClasses}`, css, this.cssTemplate)
          if (classStr) {
            CSSCode += '\n' + cssSpace + classStr
          }
          this.metaIndex = 0
          break
        case 'text':
        case 'img':
          this.prevLayout
          this.metaIndex++
          const codeInfo = Meta.getMetaData(componentData[id], htmlSpace, publicString, metaIndex)
          html += codeInfo.html

          const privateClass = classes || `${Utils.classes}${type}`
          let suffix = classes ? '' : `:nth-child(${metaIndex})`
          const classInfo = { privateClass: `${privateClass}${suffix}` }
          if (this.cssTemplate === 'css') {
            classInfo.componentClass = this.layoutClasses || `block_${layoutIndex}`
          }
          const cssCodeStr = getMetaCSS(classInfo, css)
          CSSCode += cssCodeStr ? '\n' + cssSpace + cssCodeStr : ''
          break
      }
      if (!children.length) {
        switch (type) {
          case 'Container':
            html += htmlSpace + Layout.ContainerHTML.end
            break
          case 'Row':
            html += htmlSpace + Layout.RowHTML.end
            break
        }
        this.level--
      } else {
        this.prevLayout = target // 上一个Row容器
        
        children.forEach((item, index) => {
          const result = this.recursion(item)
          html += result.html
          CSSCode += result.css
          if (index === children.length - 1) {
            // const prevType = componentData[this.prevLayout.id].type
            html += htmlSpace + Layout.RowHTML.end
            if (this.cssTemplate === 'less') {
              CSSCode += cssSpace + '}\n'
            }
            this.level--
          }
        })
      }
    }
    return { html, css: CSSCode }
  }
}

/**
 * 生成Vue组件代码
 */
class GenerateVueCode {
  init (layout, componentData) {
    const publicCss = pullAwayCss(componentData)
    // const publicCss = {}
    const componentHtml = new GetComponentHtml(layout, componentData, '  ', 'less', publicCss)
    let importList = componentHtml.importList
    
    let formatHTML = `<template>\n${componentHtml.html}</template>\n` // 格式化的html
    let formatJs = `<script>\n${this.formatVueJSCode(importList)}\n</script>\n`
    let formatCSS = `<style lang="less" scoped>\n.${componentData[layout.id].name} span { display: inline-block; }\n${componentHtml.CSSCode.replace(/\s+\.[\w\_\d]+\s\{\s+\}/g, '')}\n// 以下是抽离的公共样式\n${formatPublicCss(publicCss)}\n</style>\n` // 格式化的css
    
    return authorCode + formatHTML + formatJs + formatCSS
  }
  formatVueJSCode (importList) {
    let keys = Object.keys(importList)
    let code = keys.map(name => {
      return `import ${name} from './${name}.vue'\n`
    }).join('')
    let componentsCode = keys.length ? `\n  components: { ${keys.join(', ')} }\n` : ''
    code += `${keys.length ? '\n' : ''}export default {${componentsCode}}`
    return code
  }
}


/**
 * 生成React组件代码
 */
class GenerateReactCode {
  init (layout, componentData) {
    const publicCss = pullAwayCss(componentData)
    const componentHtml = new GetComponentHtml(layout, componentData, '      ', 'css', publicCss)
    let importList = componentHtml.importList
    let formatHTML = `\n${componentHtml.html}` // 格式化的html
    const strictCode = `'use strict';\n\n`
    const ImportJsCode = `import React, { Component } from 'react';\n${this.formatJSCode(importList)}`
    const importCssCode = `import './style.css';\n\n`
    const classCode = `class Page extends Component {\n  render() {\n    return (`
    const endCode = `    );\n  }\n}\nexport default Page;\n`
    let formatCSS = `.${componentData[layout.id].name} span { display: inline-block; }\n${componentHtml.CSSCode}\n/* 以下是抽离的公共样式 */\n${formatPublicCss(publicCss)}\n` // 格式化的css

    return {
      html: strictCode + ImportJsCode + importCssCode + classCode + formatHTML + endCode,
      css: formatCSS,
    }
  }
  formatJSCode (importList) {
    let keys = Object.keys(importList)
    let code = keys.map(name => {
      return `import ${name} from './${name}.jsx'\n`
    }).join('')
    return code
  }
}

module.exports = { GenerateVueCode, GenerateReactCode }