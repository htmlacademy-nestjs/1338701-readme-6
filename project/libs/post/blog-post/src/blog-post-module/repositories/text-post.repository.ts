import { Injectable } from '@nestjs/common'
import { BaseMemoryRepository } from '@project/data-access'
import { PostType } from '@project/shared/core'
import { RepositoryType } from 'libs/post/blog-post/src/blog-post-module/decorators/repository-type.decorator'
import { TextPostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/text-post.entity'
import { TextPostFactory } from 'libs/post/blog-post/src/blog-post-module/factories/text-post.factory'

@Injectable()
@RepositoryType(PostType.Text)
export class TextPostRepository extends BaseMemoryRepository<TextPostEntity> {
  constructor(protected readonly entityFactory: TextPostFactory) {
    super(entityFactory)
  }
}
