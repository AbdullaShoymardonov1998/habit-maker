import { EXCLUDED_LOGGING_ROUTES } from '@/consts/excluded-routes'
import { Injectable, NestMiddleware } from '@nestjs/common'

import { Request, Response, NextFunction } from 'express'

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const { method } = request

    response.on('close', () => {
      const { statusCode } = response
      const contentLength = response.get('content-length')
      const firstUrlPart = request.url.split('?')[0]

      if (!EXCLUDED_LOGGING_ROUTES.includes(firstUrlPart)) {
        console.log(
          `${method} ${
            request.url
          } ${statusCode} ${contentLength}, Req body: ${JSON.stringify(
            request.body,
            null,
            2,
          )}\nReq query: ${JSON.stringify(request.query, null, 2)}`,
        )
      }
    })

    next()
  }
}
