import { Injectable } from '@nestjs/common'
import { BaseMemoryRepository } from '@project/data-access'
import { PostType } from '@project/shared/core'
import { RepositoryType } from 'libs/post/blog-post/src/decorators/repository-type.decorator'
import { LinkPostEntity } from 'libs/post/blog-post/src/entities/link-post.entity'
import { LinkPostFactory } from 'libs/post/blog-post/src/factories/link-post.factory'

@Injectable()
@RepositoryType(PostType.Link)
export class LinkPostRepository extends BaseMemoryRepository<LinkPostEntity> {
  constructor(protected readonly entityFactory: LinkPostFactory) {
    super(entityFactory)
  }
}
