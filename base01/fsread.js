const fs = require('fs')

// const file = fs.readFileSync('./React.txt', 'utf8')
// console.log(file)

// console.log('sync start')
// fs.readFile('./React.txt', 'utf8', (err, data) => {
//   console.log('React')
//   console.log(data)
//   console.log("err", err)
// })

// console.log('sync progress');

// fs.readFile('./WebGL.txt', 'utf8', (err, data) => {
//   console.log('WebGL');
//   console.log(data);
// });

// console.log('sync finish');

const content = 'add something to React'
fs.writeFileSync('./React.txt', content) //若文件已存在，原文件会被覆盖

// 同步写入
const content1 = 'test Async' 
fs.writeFile('./aa.md', content1, err => {
  if(err) throw err
  console.log('content1 done')
})

const content2 = 'test content2'
fs.writeFile('./bb.md', content2, err => {
  if(err) throw err
  console.log('content2 done')
})

// 监听文件改变
fs.watch('./React.txt', 'utf8', (eventType, filename) => {
  console.log(eventType, filename)
})