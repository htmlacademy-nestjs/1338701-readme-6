import { EntityFactory, IPost, IPostLink } from '@project/shared/core'
import { LinkPostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/link-post.entity'

export class LinkPostFactory implements EntityFactory<LinkPostEntity> {
  create(entityPlainData: IPost): LinkPostEntity {
    return new LinkPostEntity(entityPlainData)
  }
}
