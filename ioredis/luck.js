const Redis = require('ioredis')
const redis = new Redis(6379, '127.0.0.1')

const fs = require('fs')
const { Console } = require('console')

const output = fs.createWriteStream('./stdout.log')
const errorOutput = fs.createWriteStream('./stderr.log')
const logger = new Console(output, errorOutput)

async function luck() {
  const count = 20
  const key = 'counter:luck'
  const keyExists = await redis.exists(key)

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
