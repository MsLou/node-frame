/*
 * @Author: Luoxd
 * @Description: 
 * @Date: 2020-01-10 11:54:07
 * @LastEditTime : 2020-01-19 10:56:42
 * @LastEditors  : Luoxd
 */
const koaRouter = require('koa-router')
const requireDirectory = require('require-directory')

class Init {
    static initCore (app) {
        Init.app = app
        Init.initLoadRouters()
    }
    static initLoadRouters () {
        // 绝对路径
        const apiDirectory = `${process.cwd()}/app/api`
        // 自动加载路由
        requireDirectory(module, apiDirectory, {
            visit: whenLoadModule
        })
        function whenLoadModule (obj) {
            if (obj instanceof koaRouter) {
                Init.app.use(obj.routes())
            }
        }
    }
}

module.exports = Init
