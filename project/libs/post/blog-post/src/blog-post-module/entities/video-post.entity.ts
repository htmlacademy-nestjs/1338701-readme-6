import { IPost, IPostText, IPostVideo, StorableEntity } from '@project/shared/core'
import { BasePostEntity } from './base-post.entity'

export class VideoPostEntity extends BasePostEntity implements StorableEntity<IPost> {
  public post: IPost
  public urlYoutube: string

  constructor(postVideo: IPostVideo) {
    super(postVideo)
  }

  public populate(postVideo?: IPostVideo) {
    if (!postVideo) {
      return
    }

    this.post = super.toPOJO()
    this.urlYoutube = postVideo.urlYoutube
  }

  toPOJO(): IPostVideo {
    return {
      ...this.post,
      urlYoutube: this.urlYoutube
    }
  }
}
