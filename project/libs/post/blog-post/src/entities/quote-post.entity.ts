import { IPost, IPostQuote, StorableEntity } from '@project/shared/core'
import { BasePostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/base-post.entity'

export class QuotePostEntity extends BasePostEntity implements StorableEntity<IPost> {
  private postQuote: IPostQuote
  private basePost: IPost

  constructor(post: IPost) {
    super(post)
    this.populate(post)
  }

  public populate(post?: IPost) {
    if (!post?.postQuote) {
      return
    }

    this.postQuote = post.postQuote
    this.basePost = super.toPOJO()
  }

  toPOJO(): IPost {
    return {
      ...this.basePost,
      postQuote: this.postQuote
    }
  }
}
