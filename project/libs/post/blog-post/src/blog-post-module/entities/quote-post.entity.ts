import { IPost, IPostLink, IPostQuote, IPostText, IPostVideo, StorableEntity } from '@project/shared/core'
import { BasePostEntity } from './base-post.entity'

export class QuotePostEntity extends BasePostEntity implements StorableEntity<IPost> {
  public post: IPost
  public quoteContent: string

  constructor(postQuote: IPostQuote) {
    super(postQuote)
    this.populate(postQuote)
  }

  public populate(postQuote?: IPostQuote) {
    if (!postQuote) {
      return
    }

    this.post = super.toPOJO()
    this.quoteContent = postQuote.quoteContent
  }

  toPOJO(): IPostQuote {
    return {
      ...this.post,
      quoteContent: this.quoteContent
    }
  }
}
