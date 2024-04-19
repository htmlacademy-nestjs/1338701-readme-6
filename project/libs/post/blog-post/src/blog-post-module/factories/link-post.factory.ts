import { Injectable } from '@nestjs/common'
import { EntityFactory, IPost, PostType } from '@project/shared/core'
import { FactoriesType } from 'libs/post/blog-post/src/blog-post-module/decorators/factories-type.decorator'
import { LinkPostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/link-post.entity'

@Injectable()
@FactoriesType(PostType.Link)
export class LinkPostFactory implements EntityFactory<LinkPostEntity> {
  create(entityPlainData: IPost): LinkPostEntity {
    return new LinkPostEntity(entityPlainData)
  }
}
