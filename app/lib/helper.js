/*
 * @Author: Luoxd
 * @Description: 
 * @Date: 2020-01-21 09:52:33
 * @LastEditTime: 2020-03-08 11:48:15
 * @LastEditors: Luoxd
 */
class Resolve {
  success(msg = 'success', code = 200) {
    return {
      msg,
      code,
    }
  }

  json(data, msg = 'success', errorCode = 0, code = 200) {
    return {
      code,
      msg,
      errorCode,
      data
    }
  }

  err (msg = 'err', code = 403) {
    return {
      msg,
      errorCode: -1,
      code
    }
  }
}

module.exports = {
  Resolve
}
