import { Configuration, App } from '@midwayjs/core';
import * as express from '@midwayjs/express';
import * as redis from '@midwayjs/redis';
import { join } from 'path';

@Configuration({
  imports: [express, redis],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('express')
  app: express.Application;

  async onReady() {}
}
