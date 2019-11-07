const net = require('net');
const client = net.createConnection({
  host: '127.0.0.1',
  port: 3000
});

client.on('connect', () => {
  // 向服务器发送数据
  client.write('Nodejs 技术栈');

  setTimeout(() => {
    client.write('JavaScript ');
    client.write('TypeScript ');
    client.write('Python ');
    client.write('Java ');
    client.write('C ');
    client.write('PHP ');
    client.write('ASP.NET ');
  }, 1000);
  // 这里我们会看到输出是这样的
  // hello Nodejs 技术栈
  // hello JavaScript
  // hello TypeScript Python Java C PHP ASP.NET

  // 这是因为客户端（发送的一端）在发送之前会将短时间有多个发送的数据块缓冲到一起
  // （发送端缓冲区），形成一个大的数据块一并发送，同样接收端也有一个接收端缓冲区，
  // 收到的数据先存放接收端缓冲区，然后程序从这里读取部分数据进行消费，
  // 这样做也是为了减少 I/O 消耗达到性能优化

  // 所以？数据到达缓冲区什么时间开始发送？
  // 这取决于拥塞控制，而我们可以通过延迟发送、关闭Nagle算法、封包/拆包解决粘包问题
})

// 延迟发送如下
// client.on('connect', () => {
//   client.setNoDelay(true); //关闭Nagle算法，但并不总是有效的
//   // 向服务器发送数据
//   client.write('Nodejs 技术栈');

//   const arr = [
//     'JavaScript ',
//     'TypeScript ',
//     'Python ',
//     'Java ',
//     'C ',
//     'PHP ',
//     'ASP.NET '
//   ]

//   for (let i=0; i<arr.length; i++) {
//     (function(val, k){
//       setTimeout(() => {
//         client.write(val);
//       }, 1000 * (k+1))
//     }(arr[i], i));
//   }
// })

client.on('data', buffer => {
  console.log(buffer.toString());
});

// 例如监听一个未开启的端口就会报 ECONNREFUSED 错误
client.on('error', err => {
  console.error('服务器异常：', err);
});

client.on('close', err => {
  console.log('客户端链接断开！', err);
});