import { IPost, IPostLink, IPostPhoto, IPostQuote, IPostText, IPostVideo, StorableEntity } from '@project/shared/core'
import { BasePostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/base-post.entity'

export class CommonPostEntity extends BasePostEntity implements StorableEntity<IPost> {
  public postVideo?: IPostVideo
  public postText?: IPostText
  public postLink?: IPostLink
  public postQuote?: IPostQuote
  public postPhoto?: IPostPhoto

  constructor(post?: IPost) {
    super(post)
    if (!post) {
      return
    }

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
