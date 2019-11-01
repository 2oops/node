// 计算耗时造成的线程堵塞

const http = require('http')
const [url, port] = ['127.0.0.1', 3000]

const computation = () => {
  let sum = 0;
  console.info('compute start')
  console.time('spendTime')

  for(let i = 0; i < 1e10; i++) {
    sum += i
  }

  console.info('compute end')
  console.timeEnd('spendTime')
  
  return sum
}

const server = http.createServer((req, res) => {
  if(req.url == '/compute') {
    const sum = computation()

    res.end(`sum is ${sum}`)
  }
  res.end('ok')
})

server.listen(port, url, () => {
  console.log(`server listen at http://${url}:${port}`)
})