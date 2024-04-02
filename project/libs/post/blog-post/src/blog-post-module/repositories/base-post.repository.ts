import { Injectable } from '@nestjs/common'
import { BaseMemoryRepository } from '@project/data-access'
import { LinkPostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/link-post.entity'
import { LinkPostFactory } from 'libs/post/blog-post/src/blog-post-module/factories/link-post.factory'

@Injectable()
export class BasePostRepository extends BaseMemoryRepository<LinkPostEntity> {
  constructor(protected readonly entityFactory: LinkPostFactory) {
    super(entityFactory)
  }
}
