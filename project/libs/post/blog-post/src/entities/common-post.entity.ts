import { IPost, IPostLink, IPostPhoto, IPostQuote, IPostText, IPostVideo, StorableEntity } from '@project/shared/core'
import { BasePostEntity } from 'libs/post/blog-post/src/entities/base-post.entity'

export class CommonPostEntity extends BasePostEntity implements StorableEntity<IPost> {
  private readonly postVideo?: IPostVideo
  private readonly postText?: IPostText
  private readonly postLink?: IPostLink
  private readonly postQuote?: IPostQuote
  private readonly postPhoto?: IPostPhoto

  constructor(post: IPost) {
    super(post)
    if (post.postVideo) {
      this.postVideo = post.postVideo
    }

    if (post.postText) {
      this.postText = post.postText
    }

    if (post.postLink) {
      this.postLink = post.postLink
    }

    if (post.postQuote) {
      this.postQuote = post.postQuote
    }

    if (post.postPhoto) {
      this.postPhoto = post.postPhoto
    }
  }

  toPOJO(): IPost {
    return {
      ...super.toPOJO(),
      postVideo: this.postVideo,
      postText: this.postText,
      postLink: this.postLink,
      postQuote: this.postQuote,
      postPhoto: this.postPhoto
    }
  }
}
