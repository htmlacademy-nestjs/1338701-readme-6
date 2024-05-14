import 'multer'
import { HttpService } from '@nestjs/axios'
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { ApiResponseDescription, CreateUserDto, LoginUserDto } from '@project/authentication'
import { IAuthUser } from '@project/shared/core'
import { ApplicationServiceURL } from 'apps/api-gateway/src/app/app.config'
import { AxiosExceptionFilter } from 'apps/api-gateway/src/app/filters/axios-exception.filter'
import { CheckAuthGuard } from 'apps/api-gateway/src/app/guards/check-auth.guard'
import { CheckNoAuthGuard } from 'apps/api-gateway/src/app/guards/check-no-auth.guard'
import { Request, Express } from 'express'
import { UploadedFileRdo } from 'libs/upload-library/uploader/src/uploader-module/rdo/upload-file.rdo'
import { UserRdo } from 'libs/user/blog-user/src/blog-user-module/rdo/user.rdo'

@ApiTags('Users')
@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(private readonly httpService: HttpService) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: ApiResponseDescription.UserCreated
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: ApiResponseDescription.UserExists
  })
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

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: ApiResponseDescription.UserLogged
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ApiResponseDescription.UserNotFound
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ApiResponseDescription.PasswordWrong
  })
  @UseGuards(CheckNoAuthGuard)
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/login`, loginUserDto)
    return data
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: ApiResponseDescription.RefreshTokenReceived
  })
  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/refresh`, null, {
      headers: {
        Authorization: req.headers['authorization']
      }
    })

    return data
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @UseGuards(CheckAuthGuard)
  @Get('/:userId')
  async show(@Param('userId') userId: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Auth}/${userId}`)
    return data
  }
}
