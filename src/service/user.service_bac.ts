import { Inject, Provide } from '@midwayjs/core'
import { IUserOptions } from '../interface'
import { Connection, Schema } from 'mongoose'
import { MongooseDataSourceManager } from '@midwayjs/mongoose'
// import User from '../entity/user';

interface User extends Document {
  name: string
  email: string
  avatar: string
  phone: string
  password: string
}
@Provide()
export class UserService {
  db: Connection

  @Inject()
  dataSourceManager: MongooseDataSourceManager

  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    }
  }

  async invoke(phone, password) {
    this.db = this.dataSourceManager.getDataSource('default')
    const schema = new Schema({
      name: { type: String, required: true },
      email: { type: String, required: true },
      avatar: String,
      phone: { type: String, required: true },
      password: { type: String, required: true },
    })
    const UserModel = this.db.model<User>('User', schema)
    const doc = new UserModel({
      name: '刘德华',
      email: 'bill@initech.com',
      avatar: 'https://i.imgur.com/dM7Thhn.png',
      phone,
      password,
    })
    await doc.save()
  }
}
