import { IPhoto, IPost, IPostPhoto, IPostText, IPostVideo, StorableEntity } from '@project/shared/core'
import { BasePostEntity } from './base-post.entity'

export class VideoPostEntity extends BasePostEntity implements StorableEntity<IPost> {
  public post: IPost
  public photoId: IPhoto['id']

  constructor(postPhoto: IPostPhoto) {
    super(postPhoto)
  }

  public populate(postPhoto?: IPostPhoto) {
    if (!postPhoto) {
      return
    }

    this.post = super.toPOJO()
    this.photoId = postPhoto.photoId
  }

  toPOJO(): IPostPhoto {
    return {
      ...this.post,
      photoId: this.photoId
    }
  }
}
