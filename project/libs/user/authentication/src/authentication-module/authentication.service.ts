import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { BlogUserRepository } from '@project/blog-user'
import { IAuthUser } from '@project/shared/core'
import dayjs from 'dayjs'
import { IHasher } from 'libs/shared/helpers/src/hasher/hasher.interface'
import {
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND,
  AUTH_USER_PASSWORD_WRONG,
  DATE_FORMAT
} from 'libs/user/authentication/src/authentication-module/authentication.constant'
import { CreateUserDto } from 'libs/user/authentication/src/authentication-module/dto/create-user.dto'
import { LoginUserDto } from 'libs/user/authentication/src/authentication-module/dto/login-user.dto'
import { BlogUserEntity } from 'libs/user/blog-user/src/blog-user-module/blog-user.entity'

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    @Inject('Hasher') private readonly hasher: IHasher
  ) {}

  public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
    const { email, username, password } = dto

    const currentTime = dayjs()
    const blogUser: IAuthUser = {
      id: null,
      email,
      username,
      passwordHash: null,
      createdAt: currentTime.format(DATE_FORMAT),
      updatedAt: currentTime.format(DATE_FORMAT)
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

    const isWrongPassword = existUser.passwordHash
      ? await this.hasher.compareHash(password, existUser.passwordHash)
      : true

    if (isWrongPassword) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG)
    }

    return existUser
  }
}
