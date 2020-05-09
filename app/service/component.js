/*
 * @Author: Luoxd
 * @Description: 对组件的方法
 * @Date: 2019-10-13 18:21:34
 * @LastEditTime: 2020-03-02 15:32:46
 * @LastEditors: Luoxd
 */
const fs = require('fs')
const generateTemplate = require('./codeTemplate')

/**
 * 将组件插入到文件夹，sql
 */
function pushFolder (connection, folderId, componentId) {
  connection.query(`SELECT * from folder_list WHERE folderId='${folderId}'`, (err, data) => {
    if (err) {
      console.log('查找文件夹失败：' + err)
      return
    }
    if (!data.length) {
      console.log('未找到文件夹')
      return
    }
    const componentIds = JSON.parse(data[0].componentIds)
    componentIds.push(componentId)
    connection.query(`UPDATE folder_list SET componentIds='${JSON.stringify(componentIds)}' WHERE folderId='${folderId}'`, (err) => {
      if (err) {
        console.log('插入文件夹失败：' + err)
        return
      }
    })
  })
}

/**
 * 查询文件夹下的组件
 */
function getFolderComponentList (connection, componentIds) {
  let sql = `SELECT componentId, componentName, componentImgUrl, componentDesc from component_list`
  componentIds.forEach((componentId, index) => {
    if (index === 0) {
      sql += ` Where componentId='${componentId}'`
    } else {
      sql += ` or componentId='${componentId}'`
    }
  })
  const promise = new Promise((resolve, reject) => {
    connection.query(sql, (err, data) => {
      if (err) {
        reject()
      }
      resolve(data)
    })
  })
  return promise
}

/**
 * 生成文件
 */
function generateFiled (url, data, cb) {
  fs.writeFile(url, data, { encoding: 'utf-8' }, (err) => {
    typeof cb === 'function' ? cb(err) : null
  })
}

/**
 * 生成代码
 */
function generateCode (codeInfo, curId, status, layout, data) {
  let code = '', path = `assets/component/${curId}-${codeInfo.type}`
  try {
    fs.mkdirSync(path)
  } catch (err) {

  }
  switch(codeInfo.type) {
    case 'Vue':
      code = new generateTemplate.GenerateVueCode().init(layout, data)
      break
    case 'React':
      let formatCode = new generateTemplate.GenerateReactCode().init(layout, data)
      code = formatCode.html
      generateFiled(`${path}/style.css`, formatCode.css)
      break
  }
  generateFiled(`${path}/index${codeInfo.suffix}`, code)
  return code
}

const CODE_INFO = {
  React: {
    type: 'React',
    suffix: '.jsx'
  },
  Vue: {
    type: 'Vue',
    suffix: '.vue'
  }
}

module.exports = {
  generateCode,
  CODE_INFO,
  pushFolder,
  generateFiled,
  getFolderComponentList
}
