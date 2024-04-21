import { BlogTagEntity } from '@project/blog-tag'
import { IPost, IPostQuote, StorableEntity } from '@project/shared/core'
import { CreatePostDto } from 'libs/post/blog-post/src/blog-post-module/dto/create-post.dto'
import { BasePostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/base-post.entity'

export class QuotePostEntity extends BasePostEntity implements StorableEntity<IPost> {
  protected postQuote?: IPostQuote

  constructor(post?: IPost) {
    super(post)
    if (post) {
      this.postQuote = post.postQuote
    }
  }

  static fromDto(dto: CreatePostDto, tags: BlogTagEntity[]): QuotePostEntity {
    const baseEntity = super.fromDto(dto, tags)
    const entity = new QuotePostEntity()
    Object.assign(entity, baseEntity)
    entity.postQuote = dto.postQuote
    return entity
  }

  toPOJO(): IPost {
    return {
      ...super.toPOJO(),
      postQuote: this.postQuote
    }
  }
}
