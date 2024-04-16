import { IPost, IPostText, StorableEntity } from '@project/shared/core'
import { BasePostEntity } from 'libs/post/blog-post/src/entities/base-post.entity'

export class TextPostEntity extends BasePostEntity implements StorableEntity<IPost> {
  private postText?: IPostText

  constructor(post: IPost) {
    super(post)
    this.postText = post.postText
  }

  toPOJO(): IPost {
    return {
      ...super.toPOJO(),
      postText: this.postText
    }
  }
}
