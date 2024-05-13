import 'multer'
import { HttpService } from '@nestjs/axios'
import { Body, Controller, Post, Req, UploadedFile, UseFilters, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { CreateUserDto, LoginUserDto } from '@project/authentication'
import { IAuthUser } from '@project/shared/core'
import { ApplicationServiceURL } from 'apps/api-gateway/src/app/app.config'
import { AxiosExceptionFilter } from 'apps/api-gateway/src/app/filters/axios-exception.filter'
import { Request, Express } from 'express'
import { UploadedFileRdo } from 'libs/upload-library/uploader/src/uploader-module/rdo/upload-file.rdo'

@Controller('users')
@UseFilters(AxiosExceptionFilter)
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(private readonly httpService: HttpService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto, @UploadedFile() file: Express.Multer.File) {
    console.log('work')
    const formData = new FormData()

    formData.append('createUserDto', JSON.stringify(createUserDto))

    const fileBlob = new Blob([file.buffer], { type: file.mimetype })

    formData.append('file', fileBlob, file.originalname)

    console.log(formData)
    const { data: uploadedAvatar } = await this.httpService.axiosRef.post<UploadedFileRdo>(
      `${ApplicationServiceURL.Upload}/upload`,
      formData
    )

    console.log(uploadedAvatar)

    const { data: authUser } = await this.httpService.axiosRef.post<IAuthUser>(
      `${ApplicationServiceURL.Auth}/register`,
      { ...createUserDto, avatarId: uploadedAvatar.id }
    )

    return authUser
  }

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
