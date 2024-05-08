import { InternalAxiosRequestConfig } from 'axios'
import { Observable } from 'rxjs'
import { CallHandler, ExecutionContext, Logger, NestInterceptor } from '@nestjs/common'
import { randomUUID } from 'node:crypto'

export class RequestIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const requestId = randomUUID()

    const { headers, method, url } = context.switchToHttp().getRequest<InternalAxiosRequestConfig>()
    headers['X-Request-Id'] = requestId

    Logger.log(`[${method}: ${url}]: RequestID is ${requestId}`)
    return next.handle()
  }
}
