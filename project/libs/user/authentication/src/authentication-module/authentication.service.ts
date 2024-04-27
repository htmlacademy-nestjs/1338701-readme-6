import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { BlogUserRepository } from '@project/blog-user'
import { IAuthUser, IToken, ITokenPayload } from '@project/shared/core'
import { IHasher } from 'libs/shared/helpers/src/hasher/hasher.interface'
import { ApiResponseDescription } from 'libs/user/authentication/src/authentication-module/authentication.constant'
import { CreateUserDto } from 'libs/user/authentication/src/authentication-module/dto/create-user.dto'
import { LoginUserDto } from 'libs/user/authentication/src/authentication-module/dto/login-user.dto'
import { BlogUserEntity } from 'libs/user/blog-user/src/blog-user-module/blog-user.entity'

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name)

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
    @Inject('Hasher') private readonly hasher: IHasher
  ) {}

  public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
    const { email, username, password } = dto

    const blogUser: IAuthUser = {
      email,
      username
    }

    const existUser = await this.blogUserRepository.findByEmail(email)

    if (existUser) {
      throw new ConflictException(ApiResponseDescription.UserExists)
    }

    const passwordHash = await this.hasher.hash(password)
    const userEntity = await new BlogUserEntity(blogUser).setPassword(passwordHash)
    await this.blogUserRepository.save(userEntity)
    return userEntity
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto
    const existUser = await this.blogUserRepository.findByEmail(email)

    if (!existUser) {
      throw new NotFoundException(ApiResponseDescription.UserNotFound)
    }
    console.log('password:', password)
    console.log('existUser.passwordHash:', existUser.passwordHash)
    const isCorrectPassword = existUser.passwordHash
      ? await this.hasher.compareHash(password, existUser.passwordHash)
      : false

    if (!isCorrectPassword) {
      throw new UnauthorizedException(ApiResponseDescription.PasswordWrong)
    }

    return existUser
  }

  public async createUserToken(user: BlogUserEntity): Promise<IToken> {
    const payload: ITokenPayload = {
      sub: user.id,
      email: user.email,
      username: user.username
    }

    try {
      const accessToken = await this.jwtService.signAsync(payload)
      return { accessToken }
    } catch (error) {
      const errorType = error as { message: string }
      this.logger.error('[Token generation error]: ' + errorType.message)
      throw new HttpException('Ошибка при создании токена.', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
