import { Injectable } from '@nestjs/common'
import { BaseMemoryRepository } from '@project/data-access'
import { PostType } from '@project/shared/core'
import { RepositoryType } from 'libs/post/blog-post/src/decorators/repository-type.decorator'
import { PhotoPostEntity } from 'libs/post/blog-post/src/entities/photo-post.entity'
import { PhotoPostFactory } from 'libs/post/blog-post/src/factories/photo-post.factory'

@Injectable()
@RepositoryType(PostType.Photo)
export class PhotoPostRepository extends BaseMemoryRepository<PhotoPostEntity> {
  constructor(protected readonly entityFactory: PhotoPostFactory) {
    super(entityFactory)
  }
}
