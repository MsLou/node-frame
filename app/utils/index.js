/*
 * @Author: Luoxd
 * @Description: 
 * @Date: 2019-10-04 12:37:34
 * @LastEditTime: 2020-02-20 09:59:41
 * @LastEditors: Luoxd
 */
const fs = require('fs')

module.exports = {
  classes: 'qt_', // class前缀
  // 创建唯一key
  createKey (len = 7) {
    let id = ''
    const randomArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    for (let i = 0; i < len; i++) {
      id += randomArr[Number((Math.random() * 34).toFixed(0))]
    }
    return id;
  },
  deepClone (source) {
    if (!source && typeof source !== 'object') {
      throw new Error('error arguments deepClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach((keys) => {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = this.deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    })
    return targetObj
  }
}
