const http = require('http')
const cpus = require('os').cpus()

console.log(cpus.length)  // cpu核数
const server = http.createServer((req, res) => {
  res.end('orphan worker ' + process.pid + 'ppid: ' + process.ppid)
})

let orphanWorkder;
process.on('message', (message, sendHandle) => {
  if(message === 'server') {
    orphanWorkder = sendHandle
    orphanWorkder.on('connection', socket => {
      server.emit('connection', socket)
    })
  }
})