const {encrypt, decrypt} = require('./cipheriv')

// ase-128-cbc 加密算法要求key和iv长度都为16
const key = Buffer.from('9vApxLk5G3PAsJrM', 'utf8');
const iv = Buffer.from('FnJL7EDzjqWjcaY9', 'utf8');
const sign = encrypt('hello world', key, iv);
console.log(sign); // 764a669609b0c9b041faeec0d572fd7a


// 解密
const key1 = Buffer.from('9vApxLk5G3PAsJrM', 'utf8');
const iv1 = Buffer.from('FnJL7EDzjqWjcaY9', 'utf8');
const src = decrypt('764a669609b0c9b041faeec0d572fd7a', key1, iv1);
console.log(src); // hello world