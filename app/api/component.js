/*
 * @Author: Luoxd
 * @Description: create
 * @Date: 2020-01-10 11:52:40
 * @LastEditTime: 2020-04-17 21:44:51
 * @LastEditors: Luoxd
 */
const Router = require('koa-router')
const Send = require('koa-send')
const { ComponentBo, MetaComponentBo, PageBo } = require('../Dao/component')
const { generateCode, pushFolder, generateFiled, CODE_INFO } = require('../service/component')
const { Resolve } = require('../lib/helper')
const { createKey } = require('../utils')
const fs = require('fs')
const path = require('path')
const JSZip = require('jszip')
const koaBody = require('koa-body')
const res = new Resolve()

const router = new Router({
  prefix: '/component'
})

// router.use()

// 查询单个组件
router.get('/getComponent', async (ctx) => {
  const { type } = ctx.query
  const bo = type === 'page' ? PageBo : ComponentBo
  const result = await bo.findOne(ctx.query.id)
  if (!result) {
    ctx.response.status = 200
    ctx.body = res.err('id不存在')
    return
  }
  ctx.response.status = 200
  ctx.body = res.json([result])
})

// 查询组件列表
router.all('/getComponentList', async (ctx) => {
  const { type } = ctx.query
  const bo = type === 'page' ? PageBo : ComponentBo
  const list = await bo.list(ctx)
  ctx.response.status = 200
  ctx.body = res.json(list)
})

// 查询组件预览图列表
router.get('/getComponentImgList', async (ctx) => {
  const list = await ComponentBo.getImgList()
  ctx.response.status = 200
  ctx.body = res.json(list)
})

// 查询元组件预览图列表
router.get('/getSystemComponentImgList', async (ctx) => {
  const list = await MetaComponentBo.findImgAll()
  ctx.response.status = 200
  ctx.body = res.json(list)
})

// 查询元组件列表
router.get('/getSystemComponentList', async (ctx) => {
  const list = await MetaComponentBo.findAll()
  ctx.response.status = 200
  ctx.body = res.json(list)
})

// 保存单个元组件
router.post('/saveSystemComponent', async (ctx) => {
  const { componentData, id } = ctx.request.body
  const data = { data: JSON.stringify(componentData) }
  await MetaComponentBo.save(data)
  ctx.response.status = 200
  ctx.body = res.json()
})

// 保存组件
router.post('/saveComponent', async (ctx) => {
  const { componentLayout, componentData, id, componentChildLayout, componentChildIds, type } = ctx.request.body
  const { desc, name, isPosition, folderId, codeType } = componentData[componentLayout.id]
  const currCodInfo = CODE_INFO[codeType]
  const url = (name || createKey(10)) + currCodInfo.suffix
  const info = {
    layout: JSON.stringify(componentLayout),
    data: JSON.stringify(componentData),
    childLayout: JSON.stringify(componentChildLayout),
    childIds: JSON.stringify(componentChildIds),
    url,
    desc,
    isPosition,
    name,
    id,
  }
  let curId = '', status = ''
  const bo = type === 'page' ? PageBo : ComponentBo
  if (id) {
    const findResult = await bo.findOne(id)
    if (!findResult) {
      ctx.response.status = 200
      ctx.body = res.err('id不存在')
      return
    }
    curId = id
  }
  if (curId) {
    await bo.update(id, info)
    status = 'edit'
  } else {
    curId = await bo.create(info)
    status = 'new'
  }
  generateCode(currCodInfo, curId, status, componentLayout, componentData)
  // pushFolder()
  ctx.response.status = 200
  ctx.body = res.json(curId)
})

// 组件预览图上传
router.post('/upload', async (ctx) => {
  const { data, id, name } = ctx.request.body
  fs.writeFile(path.join(__dirname, `../../assets/img/${id}.png`), new Buffer(data, 'base64'), () => {
    console.log('完成')
  })
  await ComponentBo.uploadComponentImg(id)
  ctx.response.status = 200
  ctx.body = res.json()
})

// 图片组件上传图片接口
let fileName = ''
router.post('/uploadImg', koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '../../assets/upload/'), // 设置文件上传目录
    keepExtensions: true, // 保持文件的后缀
    maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小，缺省2M
    onFileBegin (name, file) {
      const suffix = file.name.match(/\.\w+$/)
      file.path = file.path.replace(/upload\_\w+\.\w+$/, file.name)
      console.log(file)
      fileName = file.name
    }
  }
}), async ctx => {
  console.log(ctx.request.body)
  ctx.response.status = 200
  ctx.body = res.json(`/upload/${fileName}`)
})

/**
 * 下载关联的模板
 */
router.get('/downloadComponent',async (ctx) => {
  const { id, codeType } = ctx.query
  if (id === 'layoutCss') {
    path = 'assets/css/layoutCss.css'
    ctx.attachment(path)
    await Send(ctx, path)
    return
  }
  const zip = new JSZip()
  const url = 'assets/component/'
  const zipUrl = `${url}${id}-${codeType}.zip`
  const list = fs.readdirSync(`${url}${id}-${codeType}`)
  list.forEach(name => {
    const content = fs.readFileSync(`${url}${id}-${codeType}/${name}`)
    zip.file(name, content)
  })
  const content = await zip.generateAsync({
    type: "nodebuffer", // nodejs用
    compression: "DEFLATE",// 压缩算法
    compressionOptions: { // 压缩级别
      level: 9
    }
  })
  fs.writeFileSync(zipUrl, content, { encoding: 'utf-8' })
  ctx.response.status = 200
  ctx.attachment(zipUrl)
  await Send(ctx, zipUrl)
  fs.unlink(zipUrl)
})

router.get('/deleteComponent', async (ctx) => {
  await ComponentBo.deleteItem(ctx.query.id)
  ctx.response.status = 200
  ctx.body = res.json()
})

module.exports = router