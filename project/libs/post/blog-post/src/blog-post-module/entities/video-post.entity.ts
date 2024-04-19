import { IPost, IPostVideo, StorableEntity } from '@project/shared/core'
import { BasePostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/base-post.entity'

export class VideoPostEntity extends BasePostEntity implements StorableEntity<IPost> {
  private postVideo?: IPostVideo

  constructor(post: IPost) {
    super(post)
    this.postVideo = post.postVideo
  }

  toPOJO(): IPost {
    return {
      ...super.toPOJO(),
      postVideo: this.postVideo
    }
  }
}
