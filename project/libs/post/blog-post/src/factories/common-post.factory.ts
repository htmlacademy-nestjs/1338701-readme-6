import { Injectable } from '@nestjs/common'
import { EntityFactory, IPost } from '@project/shared/core'
import { CommonPostEntity } from 'libs/post/blog-post/src/entities/common-post.entity'

@Injectable()
export class CommonPostFactory implements EntityFactory<CommonPostEntity> {
  create(entityPlainData: IPost): CommonPostEntity {
    return new CommonPostEntity(entityPlainData)
  }
}
