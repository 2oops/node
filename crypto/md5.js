/*
md5作用：即是把一个任意长度的字符串转换成一定长度的16进制数字串一致性验证
特点：不可逆；输入两个不同的明文不会得到相同的输出值；原始明文无法根据输出值获取到。


*/

const crypto = require('crypto');

const md5 = str => {
  // createHash()参数可选择系统上安装的 OpenSSL 版本所支持的算法。例如：sha1、md5、sha256、sha512 等
  // hash.update(data)更新 hash 的内容为指定的 data
  // hash.digest() 计算所有传入数据的 hash 摘要,参数 encoding（编码方式）可以为 hex、binary、base64
  return crypto.createHash('md5').update(str, 'utf8').digest('hex')
};

// 默认输出长度为32位小写字母
// 25f9e794323b453885f5181f1b624d0b
console.log(md5('1234567890'));