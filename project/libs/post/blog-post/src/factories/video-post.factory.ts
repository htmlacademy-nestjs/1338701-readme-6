import { Injectable } from '@nestjs/common'
import { EntityFactory, IPost, PostType } from '@project/shared/core'
import { FactoriesType } from 'libs/post/blog-post/src/blog-post-module/decorators/factories-type.decorator'
import { VideoPostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/video-post.entity'

@Injectable()
@FactoriesType(PostType.Video)
export class VideoPostFactory implements EntityFactory<VideoPostEntity> {
  create(entityPlainData: IPost): VideoPostEntity {
    return new VideoPostEntity(entityPlainData)
  }
}
