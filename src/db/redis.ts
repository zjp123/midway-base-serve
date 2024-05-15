import IORedis from 'ioredis'

const redisClient = new IORedis({
  port: 6379, // Redis 端口号
  host: '127.0.0.1', // Redis 服务器的IP地址
  family: 4, // 4 (IPv4) 或者 6 (IPv6)
  password: 'auth', // 如果设置了连接密码
  db: 0,
})
// 连接成功
redisClient.on('connect', () => {
  console.log('redis连接成功')
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

export default redisClient
