import IORedis from 'ioredis'

// const redisClient = new IORedis({
//   port: 6379, // Redis 端口号
//   host: '127.0.0.1', // Redis 服务器的IP地址
//   family: 4, // 4 (IPv4) 或者 6 (IPv6)
//   password: 'auth', // 如果设置了连接密码
//   db: 0,
// })

const redisConnect = (process) => {
  return new IORedis({
    port: 6379, // Redis 端口号
    host: process.env.REDIS_URL || '127.0.0.1', // Redis 服务器的IP地址
    family: 4, // 4 (IPv4) 或者 6 (IPv6)
    password: process.env.REDIS_PASS ||'zjp_123_456', // 如果设置了连接密码
    db: 0,
  })
}

const redisEvent = (redisClient) => {
  // 连接成功
  redisClient.on('connect', () => {
    console.log('redis开始连接')
  })

  // 连接错误
  redisClient.on('error', error => {
    console.error('redis连接失败:', error)
  })

  redisClient.on('close', () => {
    console.log('redis连接被关闭')
  })

  // 尝试重新连接前触发
  redisClient.on('reconnecting', delay => {
    console.log(`redis正在尝试重新连接... 将在 ${delay} 毫秒后重连`)
  })

  // 监听连接成功事件
  redisClient.on('ready', function () {
    console.log('redis 连接成功666')
  })
}

export {redisConnect, redisEvent }
