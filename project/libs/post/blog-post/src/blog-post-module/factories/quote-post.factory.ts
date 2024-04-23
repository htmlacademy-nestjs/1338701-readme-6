import { Injectable } from '@nestjs/common'
import { BlogTagEntity } from '@project/blog-tag'
import { IPost, PostType } from '@project/shared/core'
import { FactoriesType } from 'libs/post/blog-post/src/blog-post-module/decorators/factories-type.decorator'
import { CreatePostDto } from 'libs/post/blog-post/src/blog-post-module/dto/create-post.dto'
import { QuotePostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/quote-post.entity'
import { IPostFactory } from 'libs/post/blog-post/src/blog-post-module/factories/types/post-factory.interface'

@Injectable()
@FactoriesType(PostType.Quote)
export class QuotePostFactory implements IPostFactory<QuotePostEntity> {
  create(entityPlainData: IPost): QuotePostEntity {
    return new QuotePostEntity(entityPlainData)
  }

  createFromCreatePostDto(dto: CreatePostDto, tags: BlogTagEntity[]): QuotePostEntity {
    return QuotePostEntity.fromDto(dto, tags)
  }
}
