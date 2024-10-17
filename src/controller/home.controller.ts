import { Controller, Get, Inject } from '@midwayjs/core'
import { Response } from '@midwayjs/express'
import { UserService } from '../service/user.service'
import * as session from '@midwayjs/express-session'

@Controller('/')
export class HomeController {
  @Inject()
  ctx

  @Inject()
  res: Response

  @Inject()
  userService: UserService

  @Inject()
  sessionStoreManager: session.SessionStoreManager

  @Get('/')
  async home() {
    // const store = this.sessionStoreManager.getSessionStore()
    // store.set('one', 666)
    if (!this.ctx.session.diy_cookie) {
      this.ctx.session.diy_cookie = 1  // 只在第一次访问时设置 views
    } else {
      this.ctx.session.diy_cookie++
    }

    this.res.send(this.ctx.session.diy_cookie + 'Hello Midwayjs!')
  }
  @Get('/login')
  async login() {
    // const { username, password } = this.ctx.body
    // const user = this.userService[username]
    // if (!user || !(await bcrypt.compare(password, user.password))) {
    //   return res.status(401).send('Invalid credentials');
    // }
    // // 设置session
    // req.session.userId = username; // 存储用户唯一标识
    // req.session.loggedIn = true;
    this.ctx.session.hhh = '哈哈哈'
    this.res.send('Logged in successfully')
  }
  @Get('/api/test')
  async test() {
    // this.res.send('testtest')
    // return { // 会触发 成功的filter  返回json时才触发 过滤器
    //   code: 200,
    //   data: 'jjjj',
    //   message:'ok'
    // }
    // throw new Error("lllll") // 会触发 错误的filter

  }
}
