import { Injectable } from '@nestjs/common'
import { BaseMemoryRepository } from '@project/data-access'
import { BlogUserEntity } from 'libs/user/blog-user/src/blog-user.entity'
import { BlogUserFactory } from 'libs/user/blog-user/src/blog-user.factory'

@Injectable()
export class BlogUserRepository extends BaseMemoryRepository<BlogUserEntity> {
  constructor(protected readonly entityFactory: BlogUserFactory) {
    super(entityFactory)
  }

  public findByEmail(email: string): Promise<BlogUserEntity | null> {
    const entities = Array.from(this.entities.values())
    const user = entities.find((entity) => entity.email === email)

    if (!user) {
      return Promise.resolve(null)
    }

    return Promise.resolve(this.entityFactory.create(user))
  }
}
