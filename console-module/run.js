const fs = require('fs');
const output = fs.createWriteStream('./stdout.txt');
const errorOutput = fs.createWriteStream('./stderr.txt');
const { Logger } = require('./logger');

const logger = Logger(output, errorOutput);

logger.info('hello 2oops!'); // 内容输出到 stdout.txt 文件
logger.error('错误日志记录'); // 内容输出到 stderr.txt 文件

logger.trace('测试错误');

// depth的使用
const family = {
  name: 'Jack',
  brother: {
      hobby: ['篮球', '足球']
  }
}

logger.dir(family, {depth: 3});


// time和timeEnd的使用，计算程序消耗时间
logger.time('计时器');

// 中间写一些测试代码
for(let i=0; i < 10000; i++){}

// 停止计时器
logger.timeEnd('计时器');

process.stdout.write('hello 2oops' + '\n');