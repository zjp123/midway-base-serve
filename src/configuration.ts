import { Configuration, App, Inject } from '@midwayjs/core'
import * as express from '@midwayjs/express'
// import * as redis from '@midwayjs/redis'
import * as session from '@midwayjs/express-session'
import RedisStore from 'connect-redis'
import { join } from 'path'
import redisClient from './db/redis'
import * as mongoose from '@midwayjs/mongoose'
import { Connection } from 'mongoose'
import { MongooseDataSourceManager } from '@midwayjs/mongoose'
// import MogoDBConnect from './db/mongoose-db'

@Configuration({
  imports: [express, mongoose],
  importConfigs: [join(__dirname, './config')],
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
  // dataSourceManager

  // @Inject()
  // dbDBConnect: MogoDBConnect

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
        prefix: 'myapp:',
      }
    )
    // this.sessionStoreManager.setSessionStore(RedisStore, {
    //   client: redisClient,
    //   prefix: "myapp:",
    // })
  }

  // async stop() {
  //   await redisClient.quit()
  // }
}
