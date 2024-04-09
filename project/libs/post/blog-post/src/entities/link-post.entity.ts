import { IPost, IPostLink, StorableEntity } from '@project/shared/core'
import { BasePostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/base-post.entity'

export class LinkPostEntity extends BasePostEntity implements StorableEntity<IPost> {
  private postLink?: IPostLink

  constructor(post: IPost) {
    super(post)
    this.postLink = post.postLink
    this.populate(post)
  }

  toPOJO(): IPost {
    return {
      ...super.toPOJO(),
      postLink: this.postLink
    }
  }
}
