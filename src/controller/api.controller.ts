import { Inject, Controller, Get, Query, Post, Body } from '@midwayjs/core'
import { Context, Response } from '@midwayjs/express'
import { UserService } from '../service/user.service'
import { encryptPassword } from '../utils/index'
@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context

  @Inject()
  userService: UserService

  @Inject()
  res: Response

  @Get('/get_user')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid })
    return { success: true, message: 'OK', data: user }
  }

  @Post('/register')
  async register(
    @Body('phone') phone: string,
    @Body('password') password: string
  ) {
    // const { username, password } = this.ctx.body

    // 这里应该有一些基础的验证逻辑
    if (!phone || !password) {
      return this.res.status(400).send('缺少用户名或密码')
    }

    try {
      // 生成哈希密码
      const hashedPassword = encryptPassword(password)

      // 在数据库中创建用户记录，存储用户名和哈希后的密码
      // createUser(phone, hashedPassword)

      this.res.status(201).send('注册成功')
    } catch (error) {
      console.error('注册失败', error)
      this.res.status(500).send('服务器错误')
    }
  }
}
