const http = require('http')
const url = require('url')
const qs = require('querystring')

const DATA = userId => ({
  code: 0,
  success: true,
  data: {
    userId,
    name: '2oops',
    descripttion: 'xiaofeiji',
    date: new Date()
  }
})

http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  const reqUrl = url.parse(req.url);
  if(reqUrl.pathname === '/api/search') {
    const uid = qs.parse(reqUrl.query).userId;
    const RESULT = JSON.stringify(DATA(uid));
    res.end(RESULT)
  } else {
    res.writeHead(404);
    res.end("Not Found")
  }
  // const RESULT = JSON.stringify(DATA)
  // res.end(RESULT)
}).listen(8000, () => {
  console.log('listenning on port 8000')
})