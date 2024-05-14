import 'multer'
import { HttpService } from '@nestjs/axios'
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { CreateUserDto, LoginUserDto } from '@project/authentication'
import { MongoIdValidationPipe } from '@project/pipes'
import { IAuthUser } from '@project/shared/core'
import { ApplicationServiceURL } from 'apps/api-gateway/src/app/app.config'
import { AxiosExceptionFilter } from 'apps/api-gateway/src/app/filters/axios-exception.filter'
import { CheckAuthGuard } from 'apps/api-gateway/src/app/guards/check-auth.guard'
import { CheckNoAuthGuard } from 'apps/api-gateway/src/app/guards/check-no-auth.guard'
import { Request, Express } from 'express'
import { UploadedFileRdo } from 'libs/upload-library/uploader/src/uploader-module/rdo/upload-file.rdo'

@Controller('users')
@UseFilters(AxiosExceptionFilter)
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(private readonly httpService: HttpService) {}

  @UseGuards(CheckNoAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto, @UploadedFile() avatar: Express.Multer.File) {
    const formData = new FormData()

    formData.append('createUserDto', JSON.stringify(createUserDto))

    const fileBlob = new Blob([avatar.buffer], { type: avatar.mimetype })

    formData.append('file', fileBlob, avatar.originalname)

    const { data: uploadedAvatar } = await this.httpService.axiosRef.post<UploadedFileRdo>(
      `${ApplicationServiceURL.Upload}/upload`,
      formData
    )

    const { data: authUser } = await this.httpService.axiosRef.post<IAuthUser>(
      `${ApplicationServiceURL.Auth}/register`,
      { ...createUserDto, avatarId: uploadedAvatar.id }
    )

    return authUser
  }

  @UseGuards(CheckNoAuthGuard)
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

  @UseGuards(CheckAuthGuard)
  @Get('/:userId')
  async show(@Param('userId') userId: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Auth}/${userId}`)
    return data
  }
}
