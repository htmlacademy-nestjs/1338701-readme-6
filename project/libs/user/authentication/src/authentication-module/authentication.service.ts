import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { BlogUserEntity, BlogUserRepository } from '@project/blog-user'
import { IAuthUser } from '@project/shared/core'
import { IHasher } from 'libs/shared/helpers/src/hasher/hasher.interface'
import {
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND,
  AUTH_USER_PASSWORD_WRONG
} from 'libs/user/authentication/src/authentication-module/authentication.constant'
import { CreateUserDto } from 'libs/user/authentication/src/authentication-module/dto/create-user.dto'
import { LoginUserDto } from 'libs/user/authentication/src/authentication-module/dto/login-user.dto'

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    @Inject('Hasher') private readonly hasher: IHasher
  ) {}

  public async register(dto: CreateUserDto) {
    const { email, username, password } = dto

    const blogUser: IAuthUser = {
      id: null,
      email,
      username,
      passwordHash: null
    }

    const existUser = await this.blogUserRepository.findByEmail(email)

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS)
    }

    const passwordHash = await this.hasher.hash(password)
    const userEntity = await new BlogUserEntity(blogUser).setPassword(passwordHash)

    return this.blogUserRepository.save(userEntity)
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto
    const existUser = await this.blogUserRepository.findByEmail(email)

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND)
    }

    const isWrongPassword = existUser.passwordHash
      ? await this.hasher.compareHash(password, existUser.passwordHash)
      : true

    if (isWrongPassword) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG)
    }

    return existUser
  }
}
