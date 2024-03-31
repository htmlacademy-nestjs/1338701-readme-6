import { Injectable } from '@nestjs/common'
import { EntityFactory, IPostLink } from '@project/shared/core'
import { LinkPostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/link-post.entity'
@Injectable()
export class LinkPostFactory implements EntityFactory<LinkPostEntity> {
  create(entityPlainData: IPostLink): LinkPostEntity {
    return new LinkPostEntity(entityPlainData)
  }
}
