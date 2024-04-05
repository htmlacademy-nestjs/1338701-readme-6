import { Injectable } from '@nestjs/common'
import { EntityFactory, IPost, PostType } from '@project/shared/core'
import { FactoriesType } from 'libs/post/blog-post/src/blog-post-module/decorators/factories-type.decorator'
import { QuotePostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/quote-post.entity'

@Injectable()
@FactoriesType(PostType.Quote)
export class QuotePostFactory implements EntityFactory<QuotePostEntity> {
  create(entityPlainData: IPost): QuotePostEntity {
    return new QuotePostEntity(entityPlainData)
  }
}
