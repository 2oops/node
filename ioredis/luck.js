// 引入Redis
// 这里是要先npm安装的 => npm i ioredis
const Redis = require('ioredis')
const redis = new Redis(6379, '127.0.0.1')

// 将日志写入指定文件，也就是抽中券的和没抽中券的请求一个记录
const fs = require('fs')
const { Console } = require('console')

const output = fs.createWriteStream('./stdout.log') // 抽中券的到这里来
const errorOutput = fs.createWriteStream('./stderr.log') // 没抽中券的到这里来
const logger = new Console(output, errorOutput)

async function luck() {
  const count = 10
  const key = 'counter:luck'
  const keyExists = await redis.exists(key) // 判断key是否存在

  // key不存在则初始化设置
  if(!keyExists) {
    await redis.setnx(key, 0)
  }

  // 每发送一次领取请求，采用 incr 命令进行自增，由于 Redis 单线程的原因，可以保证原子性，不会出现超领。
  const result = await redis.incr(key)

  console.log(`result: ${result}`)

  if(result > count) { //领取超限
    logger.error('luck failure', result)

    return
  }

  logger.info('luck success', result)
}

module.exports = luck
