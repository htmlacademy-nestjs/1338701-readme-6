import { IPost, IPostPhoto, StorableEntity } from '@project/shared/core'
import { BasePostEntity } from 'libs/post/blog-post/src/entities/base-post.entity'

export class PhotoPostEntity extends BasePostEntity implements StorableEntity<IPost> {
  private postPhoto?: IPostPhoto

  constructor(post: IPost) {
    super(post)
    this.postPhoto = post.postPhoto
  }

  toPOJO(): IPost {
    return {
      ...super.toPOJO(),
      postPhoto: this.postPhoto
    }
  }
}
