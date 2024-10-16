import { Configuration, App, Inject, IMidwayContainer } from '@midwayjs/core'
import * as express from '@midwayjs/express'
import * as session from '@midwayjs/express-session'
import RedisStore from 'connect-redis'
import { join } from 'path'
import redisClient from './db/redis'
import * as mongoose from '@midwayjs/mongoose'
import { Connection } from 'mongoose'
import { MongooseDataSourceManager } from '@midwayjs/mongoose'
import * as expressSource from 'express'
import * as jwt from '@midwayjs/jwt'
import * as crossDomain from '@midwayjs/cross-domain'
import { JwtMiddleware } from './middleware/jwt.middleware'
import { GlobalMatchFilter, GlobalError } from './filter/global.match-res' // 解决express 中间件返回值问题
@Configuration({
  imports: [express, mongoose, jwt, crossDomain],
  importConfigs: [join(__dirname, './config')],
  detectorOptions: {
    ignore: [
      '**/db/**', // midway 会扫描src下的代码 依赖注入
      '**/public/**',
    ]
  }
})
export class MainConfiguration {
  dbConn: Connection

  @App()
  container

  @App('express')
  app: express.Application

  @Inject()
  sessionStoreManager: session.SessionStoreManager

  @Inject()
  dataSourceManager: MongooseDataSourceManager

  // @Inject()
  // dbDBConnect: MogoDBConnect
  // private dbConn
  async onReady() {
    this.dbConn = this.dataSourceManager.getDataSource('default')
    this.dbConn.on(
      'error',
      console.error.bind(console, 'mongodb数据库连接错误')
    )
    this.dbConn.once('open', async () => {
      console.log('mongodb成功连接到数据库')
    })

    this.sessionStoreManager.setSessionStore(
      () => {
        return RedisStore
      },
      {
        client: redisClient,
        prefix: 'zjp:',
      }
    )
    // 依然可以像单独使用express 一样
    this.app.use(expressSource.static(join(__dirname, './public')))
    this.app.useMiddleware([
      JwtMiddleware,
    ])
    this.app.useFilter([GlobalMatchFilter, GlobalError])

  }

  async onConfigLoad() {
    // 直接返回数据，会自动合并到配置中
    // return {
    //   test: 1,
    // };
  }
  /*
  当要获取框架的服务对象，端口等信息时，就需要用到这个生命周期。
  */
  async onServerReady(container: IMidwayContainer): Promise<void> {
    // 获取到 koa 中暴露的 Framework
    // const framework = await container.getAsync(koa.Framework);
    // const server = framework.getServer();
    // ...
  }
  async onStop(): Promise<void> {
    // 关闭数据库连接
    await this.dbConn.close()
    await redisClient.quit()
  }
}
