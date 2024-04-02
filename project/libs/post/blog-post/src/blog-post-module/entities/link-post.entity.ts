import { IPost, IPostLink, StorableEntity } from '@project/shared/core'
import { BasePostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/base-post.entity'

export class LinkPostEntity extends BasePostEntity implements StorableEntity<IPost> {
  private postLink: IPostLink
  private basePost: IPost

  constructor(post: IPost) {
    super(post)
    this.populate(post)
  }

  protected populate(post: IPost) {
    if (!post.postLink) {
      return
    }

    this.postLink = post.postLink
    this.basePost = super.toPOJO()
  }

  toPOJO(): IPost {
    return {
      ...this.basePost,
      postLink: this.postLink
    }
  }
}
