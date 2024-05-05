import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { fillDto } from '@project/shared/helpers'
import { ApiResponseDescription } from 'libs/user/authentication/src/authentication-module/authentication.constant'
import { AuthenticationService } from 'libs/user/authentication/src/authentication-module/authentication.service'
import { CreateUserDto } from 'libs/user/authentication/src/authentication-module/dto/create-user.dto'
import { LoginUserDto } from 'libs/user/authentication/src/authentication-module/dto/login-user.dto'
import { LoggedUserRdo } from 'libs/user/authentication/src/authentication-module/rdo/logged-user.rdo'
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
  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto)
    const userToken = await this.authService.createUserToken(verifiedUser)
    return fillDto(LoggedUserRdo, { ...verifiedUser.toPOJO(), ...userToken })
  }
}
