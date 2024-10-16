import { Catch, Context, Match } from '@midwayjs/core';
// import { Context, Response } from '@midwayjs/express';

// 返回统一处理
@Match()
export class GlobalMatchFilter {
  match(value, req, res) {
    // ...
    return {
      code: 200,
      data: {
        value,
      },
      message: 'ok',
    }
  }
}

@Catch()
export class GlobalError {
  catch(err: any, req: Context, res: Response) {
    if (err) {
      return {
        code: err.code ?? 500,
        data: null,
        message: err.message,
      }
    }
  }
}