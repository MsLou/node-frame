/*
 * @Author: Luoxd
 * @Description: create
 * @Date: 2020-01-10 11:52:40
 * @LastEditTime : 2020-01-10 15:25:04
 * @LastEditors  : Luoxd
 */
const Router = require('koa-router')

const router = new Router({
    prefix: '/main'
})

router.get('/', async (ctx) => {
    ctx.response.status = 200
    ctx.body = {}
})

module.exports = router