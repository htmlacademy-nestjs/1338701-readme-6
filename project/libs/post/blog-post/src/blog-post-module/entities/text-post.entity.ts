import { BlogTagEntity } from '@project/blog-tag'
import { IPost, IPostText, StorableEntity } from '@project/shared/core'
import { CreatePostDto } from 'libs/post/blog-post/src/blog-post-module/dto/create-post.dto'
import { BasePostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/base-post.entity'

export class TextPostEntity extends BasePostEntity implements StorableEntity<IPost> {
  public postText?: IPostText

  constructor(post?: IPost) {
    super(post)
    if (post) {
      this.postText = post.postText
    }
  }

  static fromDto(dto: CreatePostDto, tags: BlogTagEntity[]): TextPostEntity {
    const baseEntity = super.fromDto(dto, tags)
    const entity = new TextPostEntity()
    Object.assign(entity, baseEntity)
    entity.postText = dto.postText
    return entity
  }

  toPOJO(): IPost {
    return {
      ...super.toPOJO(),
      postText: this.postText
    }
  }
}
