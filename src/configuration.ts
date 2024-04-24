import { Configuration, App, Inject } from '@midwayjs/core'
import * as express from '@midwayjs/express'
// import * as redis from '@midwayjs/redis'
import * as session from '@midwayjs/express-session'
import RedisStore from "connect-redis"
import { join } from 'path'
import redisClient from './db/redis'

@Configuration({
  imports: [express],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App()
  container

  @App('express')
  app: express.Application

  @Inject()
  sessionStoreManager: session.SessionStoreManager

  async onReady() {
    this.sessionStoreManager.setSessionStore(
      () => {
        return RedisStore
      },{
      client: redisClient,
      prefix: "myapp:",
    })
    // this.sessionStoreManager.setSessionStore(RedisStore, {
    //   client: redisClient,
    //   prefix: "myapp:",
    // })
  }
}
