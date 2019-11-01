/*
master.js 主要处理以下逻辑：
  创建一个 server 并监听 3000 端口。
  根据系统 cpus 开启多个子进程
  通过子进程对象的 send 方法发送消息到子进程进行通信
  在主进程中监听了子进程的变化，如果是自杀信号重新启动一个工作进程。
  主进程在监听到退出消息的时候，先退出子进程在退出主进程
*/

const fork = require('child_process').fork;
const cpus = require('os').cpus();

const server = require('net').createServer();
server.listen(3000);
process.title = 'node-master'

const workers = {};
const createWorker = () => {
  const worker = fork('master-worker.js')
  worker.on('message', function (message) {
    if (message.act === 'suicide') {
      createWorker();
    }
  })
  worker.on('exit', function(code, signal) {
    console.log('worker process exited, code: %s signal: %s', code, signal);
    delete workers[worker.pid];
  });
  worker.send('server', server);
  workers[worker.pid] = worker;
  console.log('worker process created, pid: %s ppid: %s', worker.pid, process.pid);
}

for (let i=0; i<cpus.length; i++) {
  createWorker();
}

process.once('SIGINT', close.bind(this, 'SIGINT')); // kill(2) Ctrl-C
process.once('SIGQUIT', close.bind(this, 'SIGQUIT')); // kill(3) Ctrl-\
process.once('SIGTERM', close.bind(this, 'SIGTERM')); // kill(15) default
process.once('exit', close.bind(this));

function close (code) {
  console.log('进程退出！', code);

  if (code !== 0) {
    for (let pid in workers) {
      console.log('master process exited, kill worker pid: ', pid);
      workers[pid].kill('SIGINT');
    }
  }

  process.exit(0);
}