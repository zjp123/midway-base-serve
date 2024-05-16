import { Init, Inject, Provide } from '@midwayjs/core'
import mongoose, { Connection } from 'mongoose'
import { MongooseDataSourceManager } from '@midwayjs/mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
  phone: { type: String, required: true },
  password: { type: String, required: true },
})

@Provide()
export class UserTest {
  db: Connection

  userModel: any

  @Inject()
  dataSourceManager: MongooseDataSourceManager

  @Init()
  async init(phone, password) {
    this.db = this.dataSourceManager.getDataSource('default')
    this.userModel = this.db.model('User', userSchema)
  }
}
