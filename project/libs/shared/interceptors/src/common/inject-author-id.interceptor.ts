import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { IRequestWithTokenPayload } from 'libs/user/authentication/src/authentication-module/request-with-token-payload.interface'

@Injectable()
export class InjectAuthorIdInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<IRequestWithTokenPayload>()
    request.body['authorId'] = request.user?.sub

    return next.handle()
  }
}
