import { EntityFactory, IPost, IPostVideo } from '@project/shared/core'
import { VideoPostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/video-post.entity'

export class VideoPostFactory implements EntityFactory<VideoPostEntity> {
  create(entityPlainData: IPost): VideoPostEntity {
    return new VideoPostEntity(entityPlainData)
  }
}
