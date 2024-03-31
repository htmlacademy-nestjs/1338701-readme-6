import { BaseMemoryRepository } from '@project/data-access'
import { Entity, StorableEntity } from '@project/shared/core'
import { BasePostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/base-post.entity'

export class PostRepository<
  T extends Entity & StorableEntity<ReturnType<T['toPOJO']>>
> extends BaseMemoryRepository<T> {
  constructor(entityFactory: T) {
    super(entityFactory)
  }
}
