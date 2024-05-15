import { Provide, Inject, Init } from '@midwayjs/core'
import { MongooseDataSourceManager } from '@midwayjs/mongoose'
import { Connection } from 'mongoose'
// import User from '../entity/user'

// 完全没有必要这样做，因为你在config中配置了mongoose的链接，midwayjs自动帮你连接了
// 你只需要把mongodb 下载安装好，并且启动就行

// interface User extends Document {
//   name: string
//   email: string
//   avatar: string
// }

@Provide()
export class TestService {
  conn: Connection
  // conn

  @Inject()
  dataSourceManager: MongooseDataSourceManager
  // dataSourceManager

  @Init()
  async init() {
    // get default connection
    this.conn = this.dataSourceManager.getDataSource('default')
    this.conn.on('error', console.error.bind(console, '数据库连接错误'))

    this.conn.once('open', async () => {
      console.log('成功连接到数据库')
    })
  }

  async stop() {
    await this.conn.close()
  }
}
