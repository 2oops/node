const http = require('http')

http.createServer().listen(3000, () => {
  process.title = 'test NodeJs process'
  console.log('process.pid:', process.pid, process.ppid) // 此时父进程是powershell.exe，子进程是node.exe
})

//  cmd控制窗口然后键入tasklist查看进程
// taskkill /f /t /im pid杀死进程
// /f杀死所有进程及子进程 /t强制杀死  /im用镜像名称作为进程信息 

  // console.log(process)
  // let { env, nextTick, pid, ppid, platform, stdout, stdin, stderr } = process
  // console.log(env, nextTick, pid, ppid, platform, stdout, stdin, stderr)
  console.log(process.cwd())

  // spawn
  // 创建父子进程间通信的三种方式

  // const spawn = require('child_process').spawn
  // const child = spawn('ls', ['-l'], {cwd: '/usr'})

  // child.stdout.pipe(process.stdout)
  // console.log(process.pid, child.pid)

  // exec
  const exec = require('child_process').exec;

  exec(`node -v`, (error, stdout, stderr) => {
    console.log({ error, stdout, stderr })
    // { error: null, stdout: 'v10.15.0\r\n', stderr: '' }
  })

  // execFile

  // fork
  const fork = require('child_process').fork
  fork('./compute.js') // fork后可以看到server listen at http://127.0.0.1:3000
