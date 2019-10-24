// NodeJs如何解决 Keep-Alive 导致 ECONNRESET 的问题
// 参考文章--https://zhuanlan.zhihu.com/p/86953757


const http = require('http')
// const agent = new http.Agent({ keepAlive: true })
const request = require('request')
const Agent = require('agentkeepalive')
const agent = new Agent()

// 执行时若报错找不到相应模块，npm install xxx --save即可

http.createServer((req, res) => {
  res.write("hello 2oops")
  res.end()
}).listen(8081)

// 问题复现
// setInterval(() => {
//   http.get("http://127.0.0.1:8081", { agent }, res => {
//     res.on('data', () => {
//       res.on('end', () => {
//         console.log("success")
//       })
//     })
//   })
// }, 5000)

setInterval(() => {
  const reqInfo = request.get('http://127.0.0.1:8081', {agent}, (err) => {
    if(!err) {
      console.log('ok')
    }else if(err.code === 'ECONNRESET' && reqInfo.req.reusedSocket) {
      return request.get('http://127.0.0.1:8081', err => {
        if(err) {
          throw err;
        }else {
          console.log('ok after try again')
        }
      })
    } else{
      throw err
    }
  })
}, 5000)
