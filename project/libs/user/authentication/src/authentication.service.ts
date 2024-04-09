import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { ConfigService, ConfigType } from '@nestjs/config'
import { BlogUserRepository } from '@project/blog-user'
import { dbConfig } from '@project/config'
import { IAuthUser } from '@project/shared/core'
import dayjs from 'dayjs'
import { IHasher } from 'libs/shared/helpers/src/hasher/hasher.interface'
import {
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND,
  AUTH_USER_PASSWORD_WRONG,
  DATE_FORMAT
} from 'libs/user/authentication/src/authentication.constant'
import { CreateUserDto } from 'libs/user/authentication/src/dto/create-user.dto'
import { LoginUserDto } from 'libs/user/authentication/src/dto/login-user.dto'
import { BlogUserEntity } from 'libs/user/blog-user/src/blog-user.entity'

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
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
      throw new ConflictException(AUTH_USER_EXISTS)
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
      throw new NotFoundException(AUTH_USER_NOT_FOUND)
    }
    console.log('password:', password)
    console.log('existUser.passwordHash:', existUser.passwordHash)
    const isCorrectPassword = existUser.passwordHash
      ? await this.hasher.compareHash(password, existUser.passwordHash)
      : false

    if (!isCorrectPassword) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG)
    }

    return existUser
  }
}
