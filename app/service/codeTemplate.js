const Layout = require('./layout')
const Meta = require('./meta')
const Utils = require('../utils')
const fs = require('fs')

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
function formatPublicCss (publicCss, currCssSpace) {
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
      `${currCssSpace}.${item.className}`,
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

function getPublicString (id, publicCss) {
  let className = []
  for (let key in publicCss) {
    const item = publicCss[key]
    if (item.hasOwnProperty(id)) {
      className.push(key)
    }
  }
  return className
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
const getVueScriptCode = (name, components) => {
  return `
export default {
  name: '${name}',
  components: {${components}},
  created () {},
  mounted () {}
}`
}

const CSS_TEMPLATE = {
  React: {
    initSpace: '    '
  },
  Vue: {
    initSpace: ''
  }
}
class GetComponentCode {
  constructor (layout, data, cssTemplate = 'less', codeTemplate = 'Vue') {
    this.componentData = data
    this.handledLayout = {}
    this.importList = {}
    this.cssTemplate = cssTemplate
    this.codeTemplate = codeTemplate
    this.html = ''
    this.css = ''
    this.layoutIndex = 0 // 容器组件遍历index
    this.metaIndex = 0 // 元组件遍历index
    this.init(layout)
  }
  init (layout) {
    // 抽离功能的样式，并删除原始返回抽离出来的
    const publicCss = pullAwayCss(this.componentData)
    // layout转成code字符串对象
    this.formatLayoutToCode(layout, this.handledLayout, publicCss)
    // code字符串对象转标准string代码规范
    const resultInfo = this.codeFormatToString(this.handledLayout, publicCss)
    this.html = resultInfo.htmlCode
    this.css = resultInfo.cssCode
  }
  /**
   * 子组件中是否有存在css
   */
  hasChildCss (handledLayout) {
    let hasCss = false
    const recursion = (layout, hasRoot) => {
      if (layout.css && !hasRoot) {
        hasCss = true
        return
      }
      if (layout.children && layout.children.length) {
        layout.children.forEach(item => {
          recursion(item)
        })
      }
    }
    recursion(handledLayout, true)
    return hasCss
  }
  /**
   * code对象转string字符串代码
   */
  codeFormatToString (layout, publicCss) {
    const { cssTemplate } = this
    let htmlCode = '',
    cssCode = '',
    level = 1
    const recursion = (layout) => {
      level++
      let currSpace = new Array(level).join('  ') + CSS_TEMPLATE[this.codeTemplate].initSpace,
      currCssSpace = new Array(level).join('  ')
      if (layout.quoteName) {
        this.importList[layout.quoteName] = null
        htmlCode += `${currSpace}<${layout.quoteName}></${layout.quoteName}>\n`
        level--
        return
      }
      const hasChildCss = this.hasChildCss(layout)
      const cssString = this.getCssString(layout, hasChildCss)
      htmlCode += currSpace + layout.html
      if (cssString) {
        if (cssTemplate === 'css') {
          cssCode += cssString
        } else {
          cssCode += currCssSpace + cssString
        }
      }
      if (layout.children && layout.children.length) {
        layout.children.forEach((item, index) => {
          recursion(item)
          if (index === layout.children.length - 1) {
            htmlCode += currSpace + '</div>\n'
            if (layout.type === 'Container' && level === 2) {
              cssCode += formatPublicCss(publicCss, cssTemplate === 'less' ? currCssSpace + '  ' : '') + '\n'
            }
            if (cssTemplate === 'less') {
              if (hasChildCss) {
                cssCode += currCssSpace + '}\n'
              } else if (layout.css) {
                cssCode += ' }\n'
              }
            }
            level--
          }
        })
        
      } else {
        level--
      }
    }
    recursion(layout)
    return { htmlCode, cssCode }
  }
  getCssString (layout, hasChildCss) {
    const { cssTemplate } = this
    let cssCode = ''
    if (layout.css) {
      switch(layout.type) {
        case 'img':
        case 'text':
        case 'a':
        case 'input':
          let classes = layout.defaultClasses ? `${layout.defaultClasses}:nth-child(${layout.index})` : layout.classes
          let parentClasses = layout.parent.defaultClasses || layout.parent.classes
          if (cssTemplate === 'css') {
            cssCode += `.${parentClasses} > .${classes}`
          } else {
            cssCode += `.${classes}`
          }
          cssCode += ` { ${layout.css} }\n`
          break
        default:
          cssCode += `.${layout.defaultClasses || layout.classes}`
          if (cssTemplate === 'css') {
            cssCode += ` { ${layout.css} }\n`
          } else {
            cssCode += ` { ${layout.css}`
            if (hasChildCss) {
              cssCode += `\n`
            }
          }
      }
    } else if (cssTemplate === 'less' && (layout.type === 'Row' || layout.type === 'Container') && hasChildCss) {
      cssCode += `.${layout.defaultClasses || layout.classes} {\n`
    }
    return cssCode
  }
  // 递归
  formatLayoutToCode (layout, handledLayout, publicCss) {
    const { componentData } = this
    let prevRowComponent = {}
    const recursion = (layout, handledLayout) => {
      const data = componentData[layout.id]
      if (layout.hasQuote) {
        handledLayout.quoteName = layout.quoteName
        handledLayout.originComponentId = layout.originComponentId
        return
      }
      // 计算index
      this.countIndex(data)
      const htmlCode = this.formatLayoutToHTMLString(data, publicCss)
      const cssCode = this.formatLayoutToCSSString(data)
      handledLayout.css = cssCode
      handledLayout.html = htmlCode
      handledLayout.children = []
      handledLayout.parent = prevRowComponent
      handledLayout.type = data.type
      if (data.classes) {
        handledLayout.classes = data.classes
      } else {
        let autoClassesInfo = this.countAutoClasses(data)
        handledLayout.defaultClasses = autoClassesInfo.classes
        handledLayout.index = autoClassesInfo.index
      }
      switch(data.type) {
        case 'Container':
        case 'Row':
          prevRowComponent = handledLayout
          break
      }
      if (layout.children.length) {
        layout.children.forEach(itemLayout => {
          const newHandledData = {}
          recursion(itemLayout, newHandledData)
          if (newHandledData.hasError) {
            return
          }
          handledLayout.children.push(newHandledData)
        })
      }
    }
    recursion(layout, handledLayout)
  }
  /**
   * 计算默认的class
   */
  countAutoClasses (data) {
    switch(data.type) {
      case 'Container':
      case 'Row':
        return { classes: `block_${this.layoutIndex}`, index: this.layoutIndex }
      default:
        return { classes: `qt_${data.type}`, index: this.metaIndex }
    }
  }
  /**
   * 计算index
   */
  countIndex (data) {
    switch(data.type) {
      case 'Container':
      case 'Row':
        this.layoutIndex++
        this.metaIndex = 0
        break
      case 'img':
      case 'text':
      case 'a':
      case 'input':
        this.metaIndex++
        break
      default:
        throw('index error type!')
    }
  }
  /**
   * 根据单个componentData解析生成html字符串
   */
  formatLayoutToHTMLString (data, publicCss) {
    const { type, css, classes, id } = data
    const { layoutIndex } = this
    let publicClass = getPublicString(id, publicCss).join(' ')
    publicClass = publicClass ? ' ' + publicClass : ''
    switch(type) {
      case 'Container':
        const classList = [classes, `block_${layoutIndex}`, publicClass]
        const containerCodeHTML = Layout.ContainerHTML(classList, css)
        return containerCodeHTML
      case 'Row':
        const rowClasses = classes || `block_${layoutIndex}`
        const rowCodeHTML = Layout.RowHTML(rowClasses + publicClass, css)
        return rowCodeHTML
      case 'img':
      case 'text':
      case 'a':
      case 'input':
        const metaCodeHTML = Meta.getMetaData(data, publicClass, this.metaIndex)
        return metaCodeHTML
        break
      default:
        // throw('error type!')
        return ''
    }
  }
  /**
   * 根据单个componentData解析生成CSS字符串
   */
  formatLayoutToCSSString (data) {
    return formatCSSObj(data.css)
  }
}

function formatJSCode (importList, suffix = '.vue') {
  let keys = Object.keys(importList)
  let code = keys.map(name => {
    return `import ${name} from './${name}${suffix}'`
  })
  return {
    components: keys.join(', '),
    code
  }
}

/**
 * 生成Vue组件代码
 */
class GenerateVueCode {
  init (layout, componentData) {
    const componentHtml = new GetComponentCode(layout, componentData, 'less', 'Vue')
    const jsCode = formatJSCode(componentHtml.importList)
    let formatHTML = `<template>\n${componentHtml.html}</template>\n` // 格式化的html
    let formatJs = `<script>\n${jsCode.code.join('\n')}${getVueScriptCode('', jsCode.components)}\n</script>\n`
    let formatCSS = `<style lang="less" scoped>\n  .${componentData[layout.id].name} span { display: inline-block; }\n${componentHtml.css}</style>\n` // 格式化的css
    
    return authorCode + formatHTML + formatJs + formatCSS
  }
  
}


/**
 * 生成React组件代码
 */
class GenerateReactCode {
  init (layout, componentData) {
    const componentHtml = new GetComponentCode(layout, componentData, 'css', 'React')
    const jsCode = formatJSCode(componentHtml.importList, '.jsx')
    let formatHTML = `\n${componentHtml.html}` // 格式化的html
    const strictCode = `'use strict';\n\n`
    const ImportJsCode = `import React, { Component } from 'react';\n${jsCode.code.join('\n')}\n`
    const importCssCode = `import './style.css';\n\n`
    const classCode = `class Page extends Component {\n  render() {\n    return (`
    const endCode = `    );\n  }\n}\nexport default Page;\n`
    let formatCSS = `.${componentData[layout.id].name} span { display: inline-block; }\n${componentHtml.css}\n` // 格式化的css

    return {
      html: strictCode + ImportJsCode + importCssCode + classCode + formatHTML + endCode,
      css: formatCSS,
    }
  }
}

module.exports = { GenerateVueCode, GenerateReactCode }