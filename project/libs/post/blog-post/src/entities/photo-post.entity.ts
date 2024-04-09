import { IPost, IPostPhoto, StorableEntity } from '@project/shared/core'
import { BasePostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/base-post.entity'

export class PhotoPostEntity extends BasePostEntity implements StorableEntity<IPost> {
  private postPhoto?: IPostPhoto
  private basePost: IPost

  constructor(post: IPost) {
    super(post)
    this.populate(post)
  }

  public populate(post?: IPost) {
    if (!post?.postPhoto) {
      return
    }

    this.postPhoto = post.postPhoto
    this.basePost = super.toPOJO()
  }

  toPOJO(): IPost {
    return {
      ...this.basePost,
      postPhoto: this.postPhoto
    }
  }
}
