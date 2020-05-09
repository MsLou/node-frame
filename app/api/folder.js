/*
 * @Author: Luoxd
 * @Description: create
 * @Date: 2020-01-10 11:52:40
 * @LastEditTime : 2020-02-01 15:59:07
 * @LastEditors  : Luoxd
 */
const Router = require('koa-router')
const { FolderBo } = require('../Dao/folder')
const { Resolve } = require('../lib/helper')
const res = new Resolve()

const router = new Router({
  prefix: '/folder'
})

router.get('/getFolderList', async (ctx) => {
  const list = await FolderBo.list(ctx)
  
  // await ListBo.create(ctx)
  ctx.response.status = 200
  ctx.body = res.json(list)
})

router.get('/createFolder', async (ctx) => {
  const { name } = ctx.query
  await FolderBo.create(name || '')
  ctx.response.status = 200
  ctx.body = res.json('创建成功')
})

module.exports = router