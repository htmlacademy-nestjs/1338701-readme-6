import { HttpService } from '@nestjs/axios'
import { Body, Controller, Post, Req, UseFilters } from '@nestjs/common'
import { ApplicationServiceURL } from 'apps/api-gateway/src/app/app.config'
import { AxiosExceptionFilter } from 'apps/api-gateway/src/app/filters/axios-exception.filter'
import { LoginUserDto } from 'libs/user/authentication/src/authentication-module/dto/login-user.dto'
import { Request } from 'express'

@Controller('users')
@UseFilters(AxiosExceptionFilter)
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(private readonly httpService: HttpService) {}

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/login`, loginUserDto)
    return data
  }

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/refresh`, null, {
      headers: {
        Authorization: req.headers['authorization']
      }
    })

    return data
  }
}
