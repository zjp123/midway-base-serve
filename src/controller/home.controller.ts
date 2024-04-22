import { Controller, Get, Inject } from '@midwayjs/core'
import { Context, Response } from '@midwayjs/express'
import { UserService } from '../service/user.service'

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context

  @Inject()
  res: Response

  @Inject()
  userService: UserService

  @Get('/')
  async home(): Promise<string> {
    return 'Hello Midwayjs!'
  }
  async login(): Promise<string> {
    const { username, password } = this.ctx.body
    // const user = this.userService[username]
    // if (!user || !(await bcrypt.compare(password, user.password))) {
    //   return res.status(401).send('Invalid credentials');
    // }
    // // 设置session
    // req.session.userId = username; // 存储用户唯一标识
    // req.session.loggedIn = true;
    // res.send('Logged in successfully');
  }
}
