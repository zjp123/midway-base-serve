// src/middleware/jwt.middleware

import { Inject, Middleware, httpError } from '@midwayjs/core'
import { Context, NextFunction,
  // Response
 } from '@midwayjs/express'
import { JwtService } from '@midwayjs/jwt'

@Middleware()
export class JwtMiddleware {
  @Inject()
  jwtService: JwtService;

  public static getName(): string {
    return 'jwt'
  }

  getToken (user) {
    // return this.jwtService.signSync(payload, secretOrPrivateKey, options);
  }

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 判断下有没有校验信息
      if (!ctx.headers['authorization']) {
        throw new httpError.UnauthorizedError();
      }
      // 从 header 上获取校验信息
      const parts = ctx.get('authorization').trim().split(' ');

      if (parts.length !== 2) {
        throw new httpError.UnauthorizedError();
      }

      const [scheme, token] = parts;

      if (/^Bearer$/i.test(scheme)) {
        try {
          //jwt.verify方法验证token是否有效
          await this.jwtService.verify(token, {
            complete: true,
          });
        } catch (error) {
          //token过期 生成新的token
          // const newToken = getToken(user);
          //将新token放入Authorization中返回给前端
          // Response.set('Authorization', newToken)
          return {
            code: 401,
            data: null,
            message: 'token 过期请重新登陆',
          }
        }
        await next();
      }
    };
  }

  // 配置忽略鉴权的路由地址
  public match(ctx: Context): boolean {
    // 为true走鉴权
    const ignore = ctx.path.indexOf('/api/register') !== -1 || ctx.path.indexOf('/api/login') !== -1
    return !ignore;
  }
}