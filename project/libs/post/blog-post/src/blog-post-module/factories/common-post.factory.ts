import { Injectable } from '@nestjs/common'
import { IEntityFactory, IPost } from '@project/shared/core'
import { CommonPostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/common-post.entity'

@Injectable()
export class CommonPostFactory implements IEntityFactory<CommonPostEntity> {
  create(entityPlainData: IPost): CommonPostEntity {
    return new CommonPostEntity(entityPlainData)
  }
}
