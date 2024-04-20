import { Injectable } from '@nestjs/common'
import { IEntityFactory, IPost, PostType } from '@project/shared/core'
import { FactoriesType } from 'libs/post/blog-post/src/blog-post-module/decorators/factories-type.decorator'
import { LinkPostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/link-post.entity'

@Injectable()
@FactoriesType(PostType.Link)
export class LinkPostFactory implements IEntityFactory<LinkPostEntity> {
  create(entityPlainData: IPost): LinkPostEntity {
    return new LinkPostEntity(entityPlainData)
  }
}
