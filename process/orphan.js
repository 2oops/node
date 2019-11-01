const fork = require('child_process').fork
const server = require('net').createServer()

server.listen(3000)

const worker = fork('orphan-workder.js')

worker.send('server', server)
console.log('worker process created, pid: %s ppid: %s', worker.pid, process.ppid)
process.exit(0)