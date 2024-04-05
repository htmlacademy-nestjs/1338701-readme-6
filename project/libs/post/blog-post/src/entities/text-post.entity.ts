import { IPhoto, IPost, IPostLink, IPostPhoto, IPostText, IPostVideo, StorableEntity } from '@project/shared/core'
import { BasePostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/base-post.entity'

export class TextPostEntity extends BasePostEntity implements StorableEntity<IPost> {
  private postText: IPostText
  private basePost: IPost

  constructor(postText: IPost) {
    super(postText)
    this.populate(postText)
  }

  public populate(post?: IPost) {
    if (!post?.postText) {
      return
    }

    this.postText = post.postText
    this.basePost = super.toPOJO()
  }

  toPOJO(): IPost {
    return {
      ...this.basePost,
      postText: this.postText
    }
  }
}
