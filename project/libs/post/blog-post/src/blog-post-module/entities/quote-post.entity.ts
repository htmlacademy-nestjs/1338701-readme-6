import { IPost, IPostQuote, StorableEntity } from '@project/shared/core'
import { BasePostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/base-post.entity'

export class QuotePostEntity extends BasePostEntity implements StorableEntity<IPost> {
  private postQuote?: IPostQuote

  constructor(post: IPost) {
    super(post)
    this.postQuote = post.postQuote
  }

  toPOJO(): IPost {
    return {
      ...super.toPOJO(),
      postQuote: this.postQuote
    }
  }
}
