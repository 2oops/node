const net = require('net');
// 缓存在线的用户
const users = {};
// 创建TCP服务器
net.createServer(function(socket){  
  /* 发送数据 */  
  socket.write(JSON.stringify({    
     type: 'system',    
     message: '你已经成功连接了！'  
  }));  
  /* 监听data事件 */  
  socket.on('data',function(data){    
    const msg = JSON.parse(data.toString());    
    if (msg.type === 'registe') { 
      // 注册用户，暂存socketj进全局变量users      
      users[msg.userId] = socket;    
    } else if(msg.type === 'singleMsg') { 
      // 发送消息      
      if (users[msg.targetId]) {  
        //首先查看全局变量里是否存在用户        
        users[msg.targetId].write(data, function(){          
          console.log(`${JSON.stringify(msg)} 已经被发送！`);        
        });      
      } else {  
        //不存在则认为不在线        
        const resMsg = JSON.stringify({          
          type: 'error',          
          message: `发送失败了~，${msg.targetId}用户不在线!`        
        })        
        users[msg.userId].write(resMsg, function(){          
           console.log(`${JSON.stringify(resMsg)} 已经被发送！`);       
        });      
      }    
    }  
  })
}).listen(8000,function(){  
  console.log('TCPServer listenning at port: 8000');
})