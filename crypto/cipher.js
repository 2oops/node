/* 
Crypto 加密模块是 C／C++ 实现这些算法后，暴露为 javascript 接口的模块,
包含对 OpenSSL 的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装

数据加密
crypto.createCipheriv(algorithm, pwd, iv)（推荐使用）参数分别对应算法、密码、向量
*/

function cipher(str){
  try{
    const crypto = require('crypto');
    // const cipher = crypto.createCipher('des-ecb', '123456');

    const cipher = crypto.createCipheriv('des-ecb', '23456780', ''); 
    // 与其他语言加密采用这种写法

    /**
     * update方法
     * 第一个参数代表加密的数据
     * 第二参数代表传入数据的格式，可以是'utf8', 'ascii', 'latin1'
     * 第三个参数代表加密数据的输出格式，可以是'latin1'， 'base64' 或者 'hex'。没有执行则返回Buffer
     */
    let encrypted = cipher.update(str, 'utf8', 'hex');

    /**
     * final方法，返回任何加密的内容
     * 参数可以是'latin1', 'base64' 或者 'hex'，没有指定返回Buffer
     */
    encrypted += cipher.final('hex');

    return encrypted;
  }catch(e){

    console.log('加密失败');
    return e.message || e;
  } 
}

cipher('hello world')
console.log(cipher('hello world'))