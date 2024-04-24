import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { fillDto } from '@project/shared/helpers'
import { ApiResponseDescription } from 'libs/user/authentication/src/authentication-module/authentication.constant'
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
    description: ApiResponseDescription.USER_CREATED
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: ApiResponseDescription.USER_EXISTS
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto)
    return newUser.toPOJO()
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: ApiResponseDescription.USER_LOGGED
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ApiResponseDescription.USER_NOT_FOUND
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ApiResponseDescription.PASSWORD_WRONG
  })
  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto)
    const userToken = await this.authService.createUserToken(verifiedUser)
    return fillDto(LoggedUserRdo, { ...verifiedUser.toPOJO(), ...userToken })
  }
}
