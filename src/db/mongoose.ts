import { Provide, Inject, Init } from '@midwayjs/core'
import { MongooseDataSourceManager } from '@midwayjs/mongoose'
import { Schema, Document } from 'mongoose'
// import User from '../entity/user'

interface User extends Document {
  name: string
  email: string
  avatar: string
}

interface Connection {
  model<T>(
    arg0: string,
    schema: Schema<
      User,
      import('mongoose').Model<User, any, any, any, any>,
      {},
      {},
      {},
      {},
      import('mongoose').DefaultSchemaOptions,
      User
    >
  ): unknown
  // 定义连接对象的类型
  // model: Function
}

@Provide()
export class TestService {
  conn: Connection

  @Inject()
  dataSourceManager: MongooseDataSourceManager

  @Init()
  async init() {
    // get default connection
    this.conn = this.dataSourceManager.getDataSource('default')
  }

  async invoke() {
    const schema = new Schema<User>({
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
