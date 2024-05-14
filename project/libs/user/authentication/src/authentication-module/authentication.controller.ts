import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { MongoIdValidationPipe } from '@project/pipes'
import { fillDto } from '@project/shared/helpers'
import { ApiResponseDescription } from 'libs/user/authentication/src/authentication-module/authentication.constant'
import { AuthenticationService } from 'libs/user/authentication/src/authentication-module/authentication.service'
import { ChagePasswordDto } from 'libs/user/authentication/src/authentication-module/dto/chage-password.dto'
import { CreateUserDto } from 'libs/user/authentication/src/authentication-module/dto/create-user.dto'
import { JwtAuthGuard } from 'libs/user/authentication/src/authentication-module/guards/jwt-auth.guard'
import { JwtRefreshGuard } from 'libs/user/authentication/src/authentication-module/guards/jwt-refresh.guard'
import { LocalAuthGuard } from 'libs/user/authentication/src/authentication-module/guards/local-auth.guard'
import { LoggedUserRdo } from 'libs/user/authentication/src/authentication-module/rdo/logged-user.rdo'
import { IRequestWithTokenPayload } from 'libs/user/authentication/src/authentication-module/request-with-token-payload.interface'
import { RequestWithUser } from 'libs/user/authentication/src/authentication-module/request-with-user.interface'
import { UserRdo } from 'libs/user/blog-user/src/blog-user-module/rdo/user.rdo'
import { UserNotificationService } from 'libs/user/user-notification/src/user-notification-module/user-notification.service'

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly userNotificationService: UserNotificationService
  ) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: ApiResponseDescription.UserCreated
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: ApiResponseDescription.UserExists
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto)
    const { email, username } = newUser
    await this.userNotificationService.registerSubscriber({ email, username })

    return newUser.toPOJO()
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
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() req: RequestWithUser) {
    const userToken = await this.authService.createUserToken(req.user)
    return fillDto(LoggedUserRdo, { ...req.user.toPOJO(), ...userToken })
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @Get(':userId')
  public async show(@Param('userId', MongoIdValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id)
    return existUser.toPOJO()
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: ApiResponseDescription.RefreshTokenReceived
  })
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user)
  }

  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(@Req() { user: payload }: IRequestWithTokenPayload) {
    return payload
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: ApiResponseDescription.ChangePassword
  })
  @UseGuards(JwtAuthGuard)
  @Patch('/changePassword')
  public async changePassword(@Req() { user: payload }: IRequestWithTokenPayload, @Body() dto: ChagePasswordDto) {
    await this.authService.changePassword(dto.currentPassword, dto.newPassword, payload?.sub)
    return { message: 'Password changed successfully' }
  }
}
