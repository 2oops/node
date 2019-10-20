// 使用net模块来建立一个TCP服务器
// tcpServer.js
const net = require('net');
net.createServer(function(socket){  
  console.log('connection');  
  /*   
  * @description 添加事件监听器，当client发送数据给服务器时，事件会触发   
  */  
  socket.on('data', function (data) {    
    const message = data.toString().trim();    
   let response = `Robots:${message}`;    
   if (response.indexOf('？') > -1) {      
     response = String.prototype.slice.apply(response, [0, -2]) + '!';    
   }    
   // 过滤空消息    
   if (message) {      
     socket.write(response, function(){        
      console.log(`${response} has send!`);     
     })    
   }  
  });
}).listen(8000, function(){  
   console.log('TCPServer listenning at port: 8000');
})
