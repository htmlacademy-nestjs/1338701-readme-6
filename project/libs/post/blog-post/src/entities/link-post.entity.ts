import { IPost, IPostLink, StorableEntity } from '@project/shared/core'
import { CreatePostDto } from 'libs/post/blog-post/src/dto/create-post.dto'
import { BasePostEntity } from 'libs/post/blog-post/src/entities/base-post.entity'

export class LinkPostEntity extends BasePostEntity implements StorableEntity<IPost> {
  private postLink?: IPostLink

  constructor(post: IPost) {
    super(post)
    this.postLink = post.postLink
  }

  toPOJO(): IPost {
    return {
      ...super.toPOJO(),
      postLink: this.postLink
    }
  }
}
