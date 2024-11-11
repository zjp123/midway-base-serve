import { MidwayConfig } from '@midwayjs/core'
// import User from '../entity/user'

export default {
  mongoose: {
    // 完整的options
    // https://mongodb.github.io/node-mongodb-native/4.2/interfaces/MongoClientOptions.html
    // https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connection-options/#std-label-node-connection-options
    dataSource: {
      default: {
        uri: 'mongodb://127.0.0.1:27017/zjp_base', // 这是本地配置的环境
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          user: 'zjp',
          pass: '123456',
          authSource: 'admin',
          maxPoolSize: 10,
          // maxTimeMS: 30, 查询时设置
          socketTimeoutMS: 30000, // 设置连接空闲时间的阈值为 30 秒
          connectTimeoutMS: 20000, // 设置连接超时时间为 20 秒
          maxIdleTimeMS: 60000, // 设置连接空闲时间的最大值为 1 分钟
          w: 'majority',
          readConcernLevel: 'majority',
          // autoReconnect: true, // 无效 mongoose 6版本已去掉，查看官方文档，不要看中文文档
          // reconnectTries: 30, // 设置在断开连接后尝试重新连接的最大次数，默认为 30 次  无效 无效 mongoose 6版本已去掉，查看官方文档，不要看中文文档
          // reconnectInterval: 1000, // 设置两次重新连接尝试之间的等待时间，默认为 1000 毫秒（1 秒） 无效 无效 mongoose 6版本已去掉，查看官方文档，不要看中文文档
        },
        // 关联实体
        // entities: [User],
      },
    },
  },
} as unknown as MidwayConfig
