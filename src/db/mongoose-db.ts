import { Provide, Inject, Init } from '@midwayjs/core'
import { MongooseDataSourceManager } from '@midwayjs/mongoose'
import { Schema, Document, Connection } from 'mongoose'
import User from '../entity/user'

interface User extends Document {
  name: string
  email: string
  avatar: string
}

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

  async invoke() {
    const schema = new Schema({
      name: { type: String, required: true },
      email: { type: String, required: true },
      avatar: String,
    })
    const UserModel = this.conn.model<User>('User', schema)
    const doc = new UserModel({
      name: 'Bill',
      email: 'bill@initech.com',
      avatar: 'https://i.imgur.com/dM7Thhn.png',
    })
    await doc.save()
  }
}
