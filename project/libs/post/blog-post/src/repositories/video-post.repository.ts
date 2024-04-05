import { Injectable } from '@nestjs/common'
import { BaseMemoryRepository } from '@project/data-access'
import { PostType } from '@project/shared/core'
import { RepositoryType } from 'libs/post/blog-post/src/blog-post-module/decorators/repository-type.decorator'
import { VideoPostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/video-post.entity'
import { VideoPostFactory } from 'libs/post/blog-post/src/blog-post-module/factories/video-post.factory'

@Injectable()
@RepositoryType(PostType.Video)
export class VideoPostRepository extends BaseMemoryRepository<VideoPostEntity> {
  constructor(protected readonly entityFactory: VideoPostFactory) {
    super(entityFactory)
  }
}
