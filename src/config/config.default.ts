import { MidwayConfig } from '@midwayjs/core';
// import { RedisService } from '@midwayjs/redis'


export default {
  // use for cookie sign key, should change to your own and keep security
  keys: ['2d_g', 'gk6_8'],
  express: {
    port: 7001,
  },
  // redis: {
  //   client: {
  //     port: 6379,
  //     host: '127.0.0.1',
  //     password: 'auth',
  //     db: 0,
  //   },
  // },
  session: {
    secret: 'zjl_zjp',
    name: 'zjl',
    cookie: {
      maxAge: 24 * 3600 * 1000,
      httpOnly: true,
      // sameSite: null,
    },
    // store: '@midwayjs/redis'
  },
} as unknown as MidwayConfig;
