# my_midway_project

## QuickStart

<!-- add docs here for user -->

see [midway docs][midway] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.


[midway]: https://midwayjs.org

### 三库区别
```
cookie-parser只是单纯操作cookie，设置和解析不涉及session，轻量级使用cookie-session  重量级使用express-session
```

### 总结
```
cookie 是需要的可以使用 cookie-parser midway中已经内置，可以直接使用
session 也是需要的，可以直接使用轻量级的cookie-session，midway中已内置，重量级就得使用express-session 结合redis
redis 也是需要的，单独使用存储一些数据
mongodb 数据库 mongodb 版本5.0.28
```

### 所用知识点
```
redis
jwt
MongoDB--v5.0.28
mongoose
日志
cookie
session
cors跨域
filter 过滤器，错误或者返回值

守卫--先不管，中间之后，路由之前做拦截
日志-- ctx.logger.info("hello world");
filter--ok

```
### 环境配置
``` 
环境包括三种环境，本地开发，test，生产环境, 分别对应，local, test, prod
local 对应的配置文件是default
test 就是服务器测试环境
prod 就是生产环境
```