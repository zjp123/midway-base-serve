import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
  phone: { type: String, required: true },
  password: { type: String, required: true },
})

// 加密密码的方法
UserSchema.methods.hashPassword = async function(password) {
  this.password = await bcrypt.hash(password, 10);
}
const User = mongoose.model('User', UserSchema)

export {UserSchema, User}



