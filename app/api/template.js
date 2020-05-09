/*
 * @Author: Luoxd
 * @Description: init
 * @Date: 2020-02-15 10:44:47
 * @LastEditTime: 2020-02-25 17:04:18
 * @LastEditors: Luoxd
 */
const Router = require('koa-router')
const { TemplateBo } = require('../Dao/template')
// const { formatData, pushFolder } = require('../service/component')
const { Resolve } = require('../lib/helper')
const { createKey } = require('../utils')
const fs = require('fs')
const path = require('path')
const res = new Resolve()

const router = new Router({
  prefix: '/template'
})

router.get('/getTemplateList', async (ctx) => {
  const list = await TemplateBo.list()
  ctx.response.status = 200
  ctx.body = res.json(list)
})

// 组件预览图上传
router.post('/upload', async (ctx) => {
  const { data, id, name } = ctx.request.body
  fs.writeFile(path.join(__dirname, `../../assets/img/${id}.png`), new Buffer(data, 'base64'))
  await TemplateBo.uploadComponentImg(id)
  ctx.response.status = 200
  ctx.body = res.json()
})

router.post('/createTemplate', async (ctx) => {
  const { componentLayout, componentData, id } = ctx.request.body
  const { desc, name } = componentData[componentLayout.id]
  const url = (name || createKey(10)) + '.vue'
  const info = {
    layout: JSON.stringify(componentLayout),
    data: JSON.stringify(componentData),
    url,
    desc,
    name,
    id,
  }
  if (id) {
    await TemplateBo.update(id, info)
    ctx.response.status = 200
    ctx.body = res.json(id)
  } else {
    let newId = await TemplateBo.create(info)
    ctx.response.status = 200
    ctx.body = res.json(newId)
  }
})

router.get('/getTemplate', async (ctx) => {
  const data = await TemplateBo.findOne(ctx.query.id || '')
  ctx.response.status = 200
  ctx.body = res.json(data)
})

router.get('/deleteTemplate', async (ctx) => {
  await TemplateBo.deleteItem(ctx.query.id)
  ctx.response.status = 200
  ctx.body = res.json()
})

module.exports = router