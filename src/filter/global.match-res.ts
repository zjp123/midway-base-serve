import { Catch, Match } from '@midwayjs/core';
import { Context, Response } from '@midwayjs/express';

// 返回统一处理
@Match()
export class GlobalMatchFilter {
  match(value, req, res) {
    const obj: any = {
      code: value.code || value.status,
      data: value.data,
      message: value.message,
    }
    value.pagination && (obj.pagination = value.pagination)
    return obj
  }
}

@Catch()
export class GlobalError {
  catch(err: any, req: Context, res: Response) {
    if (err) {
      console.log(err, '////////////////')
      return {
        code: err.code || err.status,
        data: null,
        message: err.message,
      }
    }
  }
}

// @Match((ctx: Context, res: Response) => {
//   return ctx.path === '/api';
// })
// export class APIMatchFilter {
//   match(value, req: Context, res: Response) {
//     // ...
//     return {
//       data: {
//         message: 'okkkk',
//         data: value,
//       },
//     };
//   }
// }