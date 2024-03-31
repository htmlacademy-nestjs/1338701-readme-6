import { Injectable, NotFoundException } from '@nestjs/common'
import { BlogUserEntity, BlogUserRepository, USER_NOT_FOUND } from '@project/blog-user'

@Injectable()
export class BlogUserService {
  constructor(private readonly blogUserRepository: BlogUserRepository) {}

  public async getUser(id: string): Promise<BlogUserEntity> {
    const existUser = await this.blogUserRepository.findById(id)
    if (!existUser) {
      throw new NotFoundException(USER_NOT_FOUND)
    }

    return existUser
  }
}
