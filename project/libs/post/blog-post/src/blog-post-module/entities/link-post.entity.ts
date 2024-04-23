import { BlogTagEntity } from '@project/blog-tag'
import { IPost, IPostLink, StorableEntity } from '@project/shared/core'
import { CreatePostDto } from 'libs/post/blog-post/src/blog-post-module/dto/create-post.dto'
import { BasePostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/base-post.entity'

export class LinkPostEntity extends BasePostEntity implements StorableEntity<IPost> {
  protected postLink?: IPostLink

  constructor(post?: IPost) {
    super(post)
    if (post) {
      this.postLink = post.postLink
    }
  }

  static fromDto(dto: CreatePostDto, tags: BlogTagEntity[]): LinkPostEntity {
    const baseEntity = super.fromDto(dto, tags)
    const entity = new LinkPostEntity()
    Object.assign(entity, baseEntity)
    entity.postLink = dto.postLink
    return entity
  }

  toPOJO(): IPost {
    return {
      ...super.toPOJO(),
      postLink: this.postLink
    }
  }
}
