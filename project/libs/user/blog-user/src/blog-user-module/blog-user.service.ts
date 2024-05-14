import { Injectable } from '@nestjs/common'
import { BlogUserRepository } from './blog-user.repository'

@Injectable()
export class BlogUserService {
  constructor(private readonly blogUserRepository: BlogUserRepository) {}

  public async getUsersByIds(userIds: string[]) {
    return await this.blogUserRepository.findManyByIds(userIds)
  }
}
