import { BlogTagEntity } from '@project/blog-tag'
import { IPost, IPostPhoto, StorableEntity } from '@project/shared/core'
import { CreatePostDto } from 'libs/post/blog-post/src/blog-post-module/dto/create-post.dto'
import { BasePostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/base-post.entity'

export class PhotoPostEntity extends BasePostEntity implements StorableEntity<IPost> {
  protected postPhoto?: IPostPhoto

  constructor(post?: IPost) {
    super(post)
    if (post) {
      this.postPhoto = post.postPhoto
    }
  }

  static fromDto(dto: CreatePostDto, tags: BlogTagEntity[]): PhotoPostEntity {
    const baseEntity = super.fromDto(dto, tags)
    const entity = new PhotoPostEntity()
    Object.assign(entity, baseEntity)
    entity.postPhoto = dto.postPhoto
    return entity
  }

  toPOJO(): IPost {
    return {
      ...super.toPOJO(),
      postPhoto: this.postPhoto
    }
  }
}
