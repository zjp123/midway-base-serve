import { Catch, Match } from '@midwayjs/core';
import { Context, Response } from '@midwayjs/express';

// 返回统一处理
@Match()
export class GlobalMatchFilter {
  match(value, req, res) {
    return {
      ...value
    }
  }
}

@Catch()
export class GlobalError {
  catch(err: any, req: Context, res: Response) {
    if (err) {
      console.log(err, '////////////////')
      return {
        code: err.code ?? 500,
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