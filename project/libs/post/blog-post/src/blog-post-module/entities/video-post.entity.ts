import { IPost, IPostVideo, StorableEntity } from '@project/shared/core'
import { BasePostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/base-post.entity'

export class VideoPostEntity extends BasePostEntity implements StorableEntity<IPost> {
  private postVideo: IPostVideo
  private basePost: IPost

  constructor(post: IPost) {
    super(post)
    this.populate(post)
  }

  public populate(post?: IPost) {
    if (!post?.postVideo) {
      return
    }

    this.postVideo = post.postVideo
    this.basePost = super.toPOJO()
  }

  toPOJO(): IPost {
    return {
      ...this.basePost,
      postVideo: this.postVideo
    }
  }
}
