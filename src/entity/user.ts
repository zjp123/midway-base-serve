import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: String,
  jobs: [{ type: String }],
})

const User = mongoose.model('User', userSchema)

export default User
