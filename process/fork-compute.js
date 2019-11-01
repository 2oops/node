const computation = () => {
  let sum = 0;
  console.info('compute start')
  console.time('spendTime')

  for(let i = 0; i < 1e10; i++) {
    sum += i
  }

  console.info('compute end')
  console.timeEnd('spendTime')
  
  return sum
}

process.on('message', msg => {
  console.log(msg, 'child: process.pid', process.pid) // 子进程pid
  const sum = computation()

  // 子进程给父进程发信息
  process.send(sum)
})