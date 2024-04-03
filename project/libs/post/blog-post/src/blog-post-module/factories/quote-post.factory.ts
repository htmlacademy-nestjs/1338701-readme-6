import { EntityFactory, IPost } from '@project/shared/core'
import { QuotePostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/quote-post.entity'

export class QuotePostFactory implements EntityFactory<QuotePostEntity> {
  create(entityPlainData: IPost): QuotePostEntity {
    return new QuotePostEntity(entityPlainData)
  }
}
