/* 起一个简单的服务，使得浏览器可以访问127.0.0.1:8000/luck接口，
代替一个领取优惠券的操作
*/

const luck = require('./luck')

const http = require('http')
const url = require('url')
const qs = require('querystring')

// 这个花里胡哨的DATA完全可以不要的，因为我们只需要起一个简单的服务
const DATA = userId => ({
  code: 0,
  success: true,
  data: {
    userId,
    name: '2oops',
    descripttion: 'go ahead',
    date: new Date()
  }
})
// 其实这里是一个比较标准的请求格式
http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  const reqUrl = url.parse(req.url);
  if(reqUrl.pathname === '/luck') {
    const uid = qs.parse(reqUrl.query).userId;
    const RESULT = JSON.stringify(DATA(uid));
    luck() // 主要在这里调用就阔以，其他的都是耍流氓
    res.end(RESULT)
  } else {
    res.writeHead(404);
    res.end("Not Found")
  }
}).listen(8000, () => {
  console.log('listening at port: 8000')
})