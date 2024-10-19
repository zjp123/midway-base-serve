import { Inject, Provide } from '@midwayjs/core'
import { IUserOptions } from '../interface'
import { Connection } from 'mongoose'
import { MongooseDataSourceManager } from '@midwayjs/mongoose'
import { UserSchema } from '../entity/user' // 第一种方式
// import { UserTest } from '../entity/test-user' 第二种方式

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

  async findUser(phone: string) {
    this.db = this.dataSourceManager.getDataSource('default')
    const UserModel = this.db.model('User', UserSchema)
    const res = UserModel.findOne({ phone })
    return res
  }

  async createUser(phone, password) {
    this.db = this.dataSourceManager.getDataSource('default')
    const UserModel = this.db.model('User', UserSchema)
    try {
        const doc = new UserModel({
          // name: '哈哈哈',
          // email: 'bill@initech.com',
          // avatar: 'https://i.imgur.com/dM7Thhn.png',
          phone,
          password,
        })
        // const doc = new this.userDb.userModel({ // 第二种方式
        //   name: '谭咏麟',
        //   email: 'bill@initech.com',
        //   avatar: 'https://i.imgur.com/dM7Thhn.png',
        //   phone,
        //   password,
        // })
        await doc.save()
    } catch (error) {
        return {
          code: 500,
          data: null,
          message: '创建用户错误'
        }
    }

  }
}