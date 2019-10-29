/*
数据解密
crypto.createDecipheriv(algorithm, pwd, iv)
*/

function decipher(encrypted) {
  try {
    const crypto = require('crypto')
    const decipher = crypto.createDecipheriv('des-ecb', '23456780', '')
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')

    decrypted += decipher.final('utf8')

    return decrypted
  }catch(e) {
    console.log('encrypte faliure')
    return e.message || e
  }
}

console.log(decipher('e1b5faf7503044e3e192b62456c4a4eb'))