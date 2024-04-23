import { Injectable } from '@nestjs/common'
import { IEntityFactory, ITag } from '@project/shared/core'
import { BlogTagEntity } from 'libs/post/blog-tag/src/blog-tag-module/blog-tag.entity'

@Injectable()
export class BlogTagFactory implements IEntityFactory<BlogTagEntity> {
  public create(entityPlainData: ITag): BlogTagEntity {
    return new BlogTagEntity(entityPlainData)
  }
}
