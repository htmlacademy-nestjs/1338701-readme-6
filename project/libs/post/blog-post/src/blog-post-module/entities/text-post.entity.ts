import { IPost, IPostText, StorableEntity } from '@project/shared/core'
import { BasePostEntity } from './base-post.entity'

export class TextPostEntity extends BasePostEntity implements StorableEntity<IPost> {
  public post: IPost
  public announcement: string
  public content: string

  constructor(postText: IPostText) {
    super(postText)
    this.populate(postText)
  }

  public populate(postText?: IPostText) {
    if (!postText) {
      return
    }

    this.post = super.toPOJO()
    this.announcement = postText.announcement
    this.content = postText.content
  }

  toPOJO(): IPostText {
    return {
      ...this.post,
      announcement: this.announcement,
      content: this.content
    }
  }
}
