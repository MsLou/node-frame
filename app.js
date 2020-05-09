/*
 * @Author: Luoxd
 * @Description: create
 * @Date: 2020-01-10 11:51:59
 * @LastEditTime: 2020-04-17 21:29:30
 * @LastEditors: Luoxd
 */
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const static = require('koa-static')
const mime = require('mime')
const path = require('path')
const Init = require('./core/init')

const staticPath = './assets'
const app = new Koa()
app.use(async (ctx, next)=> {
  // ctx.set('Access-Control-Allow-Credentials', true)
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With')
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200
  } else {
    await next()
  }
})
app.use(static(path.join(__dirname, staticPath), {
  maxage: 30
}))
app.use(bodyParser())
Init.initCore(app)


// const router = new Router();
// const fs = require('fs')
// const Path = require('path')
// router.get(/\S*\.(jpe?g|png)$/, async ctx => {
//   ctx.set('Cache-Control', 'max-age=30')
//   ctx.set('Expires', new Date(Date.now() + 300000).toGMTString())
//   ctx.set('Last-Modified', new Date(Date.now() + 300000).toGMTString())
//   // if (ctx.request.header['if-modified-since'])
//   console.log(ctx.request)
//   const { path } = ctx
//   ctx.type = mime.getType(path)
//   console.log(Path.resolve(__dirname + '/assets', `.${path}`))
//   const imageBuffer = fs.readFileSync(Path.resolve(__dirname + '/assets', `.${path}`));
//   ctx.body = imageBuffer;
//   // await next();
// })
// app.use(router.routes())

// app.get('/reportDesign.do', (ctx) => {
//   ctx.response.status = 200
//   ctx.body = res.json()
// })

app.listen(3001)