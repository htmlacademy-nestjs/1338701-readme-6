import { Injectable } from '@nestjs/common'
import { BaseMemoryRepository } from '@project/data-access'
import { PostType } from '@project/shared/core'
import { RepositoryType } from 'libs/post/blog-post/src/blog-post-module/decorators/repository-type.decorator'
import { PhotoPostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/photo-post.entity'
import { PhotoPostFactory } from 'libs/post/blog-post/src/blog-post-module/factories/photo-post.factory'

@Injectable()
@RepositoryType(PostType.Photo)
export class PhotoPostRepository extends BaseMemoryRepository<PhotoPostEntity> {
  constructor(protected readonly entityFactory: PhotoPostFactory) {
    super(entityFactory)
  }
}
