import { Injectable, NotFoundException } from '@nestjs/common'
import { BlogUserRepository } from './blog-user.repository'

import { BlogUserEntity } from 'libs/user/blog-user/src/blog-user-module/blog-user.entity'

@Injectable()
export class BlogUserService {
  constructor(private readonly blogUserRepository: BlogUserRepository) {}

  public async getUser(id: string): Promise<BlogUserEntity> {
    const existUser = await this.blogUserRepository.findById(id)
    if (!existUser) {
      throw new NotFoundException('User not found')
    }

    return existUser
  }
}
