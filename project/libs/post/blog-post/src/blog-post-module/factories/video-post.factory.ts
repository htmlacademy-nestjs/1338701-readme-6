import { Injectable } from '@nestjs/common'
import { EntityFactory, IPostVideo } from '@project/shared/core'
import { VideoPostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/video-post.entity'
@Injectable()
export class VideoPostFactory implements EntityFactory<VideoPostEntity> {
  create(entityPlainData: IPostVideo): VideoPostEntity {
    return new VideoPostEntity(entityPlainData)
  }
}
