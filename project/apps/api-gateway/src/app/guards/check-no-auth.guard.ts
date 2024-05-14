import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'

import { ApplicationServiceURL } from '../app.config'

@Injectable()
export class CheckNoAuthGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    try {
      await this.httpService.axiosRef.post(
        `${ApplicationServiceURL.Auth}/check`,
        {},
        {
          headers: {
            Authorization: request.headers['authorization']
          }
        }
      )

      return false
    } catch (error) {
      return true
    }
  }
}
