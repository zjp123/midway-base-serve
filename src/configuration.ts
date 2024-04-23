import { Configuration, App, Inject } from '@midwayjs/core'
import * as express from '@midwayjs/express'
import * as redis from '@midwayjs/redis'
import * as session from '@midwayjs/express-session'
import { join } from 'path'
import { RedisService } from '@midwayjs/redis'

@Configuration({
  imports: [express, redis],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('express')
  app: express.Application

  @Inject()
  sessionStoreManager: session.SessionStoreManager

  async onReady() {
    this.sessionStoreManager.setSessionStore(RedisService, {
      checkPeriod: 86400000, // prune expired entries every 24h
    })
  }
}
