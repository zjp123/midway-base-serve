import { Inject, Controller, Post, Body } from '@midwayjs/core'
import { Context, Response } from '@midwayjs/express'
import { UserService } from '../service/user.service'
import { encryptPassword } from '../utils/index'
import { User } from '../entity/user'
// import { User } from '../entity/user'
@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context

  @Inject()
  userService: UserService

  @Inject()
  res: Response

  @Post('/register')
  async register(
    @Body('phone') phone: string,
    @Body('password') password: string,
    @Body('confirmPassword') confirmPassword: string
  ) {
    console.log(this.ctx.body)
    // const { phone, password, confirmPassword } = this.ctx.body
    // 这里应该有一些基础的验证逻辑
    if (!phone || !password || !confirmPassword) {
      // return this.res.status(400).send('缺少用户名或密码')
      return {
        status: 400,
        data: null,
        message: '缺少用户名或密码'
      }
    }

    if (password !== confirmPassword) {
      // return this.res.status(400).json({ message: '密码不匹配' })
      return {
        status: 400,
        data: null,
        message: '密码不匹配'
      }
    }

    // 检查用户名是否已存在
    // const existingUser = await User.findOne({ phone }) 第一种
    const existingUser = await this.userService.findUser(phone) // 第二种
    if (existingUser) {
        // return this.res.status(400).json({ message: '重名不可注册' })
        return {
          status: 400,
          data: null,
          message: '重名不可注册'
        }
    }

    try {
      // 生成哈希密码
      const hashedPassword = encryptPassword(password)

      // 在数据库中创建用户记录，存储用户名和哈希后的密码
      // createUser(phone, hashedPassword)
      await this.userService.createUser(phone, hashedPassword)
      // this.res.status(200).send('注册成功')
      return {
        status: 200,
        data: null,
        message: 'ok'
      }
    } catch (error) {
      console.error('注册失败', error)
      // this.res.status(500).send(error)
      return {
        status: 500,
        data: null,
        message: error
      }
    }
  }
  @Post('/login')
  async login(
    @Body('phone') phone: string,
    @Body('password') password: string,
  ) {
    const hashedPassword = encryptPassword(password)
    const user = await User.findOne({ phone, password: hashedPassword })
    if (user) {
        // this.res.send('登陆成功，欢迎回到首页！'); // 登陆成功
        // this.res.redirect('/')
        return {
          status: 200,
          data: null,
          message: 'ok'
        }
    } else {
        // this.res.send('用户名或密码错误'); // 错误提示
        return {
          status: 400,
          data: null,
          message: '用户名或密码错误'
        }
    }
  }
}
