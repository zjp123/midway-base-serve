import { Inject, Provide } from '@midwayjs/core'
// import { IUserOptions } from '../interface'
import { Connection } from 'mongoose'
import { MongooseDataSourceManager } from '@midwayjs/mongoose'
import { UserSchema } from '../entity/user' // 第一种方式
// import { UserTest } from '../entity/test-user' 第二种方式
import { Response } from '@midwayjs/express'

@Provide()
export class UserService {
  db: Connection

  @Inject()
  res: Response

  @Inject()
  dataSourceManager: MongooseDataSourceManager

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
      // return { // 这里如果这样返回，那么程序只是认为返回了一个对象，并不是实际想要的效果，触发不了错误机制
      //   code: 500
      //   message: 'xxx'
      // }
      throw new Error(error)
    }

  }
}