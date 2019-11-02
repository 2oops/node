// Net模块构建一个TCP服务
// Net模块提供了一些用于底层通信的接口(底层传输基于二进制数据)，
// 可以用于创建基于流的TCP或IPC的服务器与客户端

// 1、new net.Server
// 2、net.createServer()

// TCP服务器事件
// listening connection close error
// TCP链接事件方法
// data(相当于读数据) end(每次socket连接会出现一次) error write(相当于写数据)

const net = require('net')
const [host, port] = ['127.0.0.1', 3000]

const server = net.createServer()

server.listen(port, host)

server.on('listening', () => {
  console.log(`server listen at http://${host}:${port}`)
})

server.on('connection', socket => {
  socket.on('data', buffer => {
    const msg = buffer.toString()
    console.log(msg)
    // write写入数据，发给客户端
    socket.write(Buffer.from(`hello ${msg}`))
  })
})

server.on('close', () => {
  console.log('Server close')
})

server.on('error', err => {
  if(err.code === 'EADDRINUSE') {
    console.log('地址正被使用，重试中')
  
    setTimeout(() => {
      server.close()
      server.listen(port, host)
    }, 1000)
  } else {
    console.log('服务器异常', err)
  }
})