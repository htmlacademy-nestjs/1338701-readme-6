import { Injectable } from '@nestjs/common'
import { EntityFactory, ITag } from '@project/shared/core'
import { BlogTagEntity } from 'libs/post/blog-tag/src/blog-tag-module/blog-tag.entity'

@Injectable()
export class BlogTagFactory implements EntityFactory<BlogTagEntity> {
  public create(entityPlainData: ITag): BlogTagEntity {
    return new BlogTagEntity(entityPlainData)
  }
}
