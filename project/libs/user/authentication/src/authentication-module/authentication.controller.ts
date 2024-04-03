import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  AUTH_USER_EXISTS,
  AUTH_USER_PASSWORD_WRONG
} from 'libs/user/authentication/src/authentication-module/authentication.constant'
import { AuthenticationService } from 'libs/user/authentication/src/authentication-module/authentication.service'
import { CreateUserDto } from 'libs/user/authentication/src/authentication-module/dto/create-user.dto'
import { LoginUserDto } from 'libs/user/authentication/src/authentication-module/dto/login-user.dto'
import { LoggedUserRdo } from 'libs/user/authentication/src/authentication-module/rdo/logged-user.rdo'
import { UserRdo } from 'libs/user/blog-user/src/blog-user-module/rdo/user.rdo'

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AUTH_USER_EXISTS
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto)
    return newUser.toPOJO()
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AUTH_USER_PASSWORD_WRONG
  })
  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto)
    return verifiedUser.toPOJO()
  }
}
