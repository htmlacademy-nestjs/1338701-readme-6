import { IPost, IPostLink, StorableEntity } from '@project/shared/core'
import { BasePostEntity } from './base-post.entity'

export class LinkPostEntity extends BasePostEntity implements StorableEntity<IPost> {
  public post: IPost
  public url: string
  public description: string | null

  constructor(postLink: IPostLink) {
    super(postLink)
    this.populate(postLink)
  }

  public populate(postLink?: IPostLink) {
    if (!postLink) {
      return
    }

    this.post = super.toPOJO()
    this.url = postLink.url
    this.description = postLink.description
  }

  toPOJO(): IPostLink {
    return {
      ...this.post,
      url: this.url,
      description: this.description
    }
  }
}
