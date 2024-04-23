import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: ['2d_g', 'gk6_8'],
  express: {
    port: 7001,
  },
  redis: {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: 'auth',
      db: 0,
    },
  },
  session: {
    secret: 'zjl_zjp', // must be set in application
    name: 'zjl',
    cookie: {
      maxAge: 24 * 3600 * 1000, // ms ---一天过期时间
      httpOnly: true,
      // sameSite: null,
    },
  },
} as MidwayConfig;
