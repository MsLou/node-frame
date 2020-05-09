/*
 * @Author: Luoxd
 * @Description: create
 * @Date: 2020-01-10 11:52:40
 * @LastEditTime: 2020-04-17 22:20:16
 * @LastEditors: Luoxd
 */
const Router = require('koa-router')
const Send = require('koa-send')
const { Resolve } = require('../lib/helper')
const res = new Resolve()
// const Page = require('../../assets/dist/index.html')
const request = require('request');

const router = new Router({
  prefix: ''
})

var options = {
  'method': 'POST',
  'url': 'http://jk.funly.cloud:8501/reportDesign.do',
  'headers': {
    'Cookie': ['gr_user_id=6902297a-cfe8-4585-a06e-fd5570314260; grwng_uid=f4ebf238-a2e0-4a0b-8a3c-99cd8bf4a591; is_static_font=true; b63dceaca33378d6_gr_session_id=6d4ddb66-504c-4c3d-95db-e1a79ff8ad4b; b63dceaca33378d6_gr_session_id_6d4ddb66-504c-4c3d-95db-e1a79ff8ad4b=true; JSESSIONID=78DA23DC8FE4EC7A50E2ED17BF01E918; ours_token=95b673ad-51ad-41f1-9460-1c90e3c994d8', 'ours_token=7843701050590620722; JSESSIONID=911E13A338805DD63CE3FC57F45045EE'],
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  form: {
    'method': 'findFormsByAppBean',
    'appId': '5e972c328ba68c20c05d186a'
  }
};


router.all('/reportDesign.do', (ctx) => {
  request(options, function (error, response) { 
    if (error) throw new Error(error);
    console.log(response.body);
    ctx.response.status = 200
    ctx.body = response.body || {}
  });
})


// var url="http://jk.funly.cloud:8501/reportDesign.do"
// // var url="http://localhost:3001/component/getComponentList"
// var requestData = {
//   appId: '5e972c328ba68c20c0 5d186a',
//   method: 'findFormsByAppBean'
// }
// request({
//     url: url,
//     method: "get",
//     json: true,
//     headers: {
//       "Cookie": 'gr_user_id=6902297a-cfe8-4585-a06e-fd5570314260; grwng_uid=f4ebf238-a2e0-4a0b-8a3c-99cd8bf4a591; is_static_font=true; JSESSIONID=78DA23DC8FE4EC7A50E2ED17BF01E918; ours_token=95b673ad-51ad-41f1-9460-1c90e3c994d8; b63dceaca33378d6_gr_session_id_789cc96e-cc19-4346-bb34-f0a4e1521c66=false; b63dceaca33378d6_gr_session_id=789cc96e-cc19-4346-bb34-f0a4e1521c66',
//       "Content-Type": 'application/x-www-form-urlencoded'
//     },
//     body: JSON.stringify(requestData)
// }, function(error, response, body) {
//   console.log(`http-statusCode=${body}`)
// });

// router.use()
// router.get('/', async (ctx) => {
//     ctx.type = 'text/html;charset=utf-8'
//     ctx.body = Page
// })

module.exports = router