const TCPClient = require('./tcp-client');
const userId = 'userId:100002';
TCPClient(userId).then(client => {  
    const msg = {    
     userId,    
     type: 'singleMsg',    
     targetId: 'userId:100001',    
     message: 'hello, I am user-b'  
    };  
    // 用定时器模拟用户在发送消息  
    setInterval(()=>{    
      client.write(JSON.stringify(msg));  
    }, 3000)
})