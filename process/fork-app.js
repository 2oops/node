// 以下在进行compute计算时创建子进程，子进程计算完成通过send方法将结果发送给子进程，主进程通过message监听消息后处理并退出

const http = require('http')
const fork = require('child_process').fork
const [url, port] = ['127.0.0.1', 3000]

const server = http.createServer((req, res) => {
  if(req.url == '/compute') {
    const compute = fork('./fork-compute.js')
    compute.send('open a new child process')

    // 子进程使用process.send()发送消息时会触发message事件
    compute.on('message', sum => {
      res.end(`fork-app: Sum is ${sum}`)
      compute.kill()
    })

    // 子进程监听到错误消息退出
    compute.on('close', (code, signal) => {
      console.log(`收到close事件，子进程收到信号 ${signal} 而终止，退出码 ${code}`);
      compute.kill()
    })
  }
  res.end('ok')
})

server.listen(port, url, () => {
  console.log(`fork-compute:server listen at http://${url}:${port}`)
})