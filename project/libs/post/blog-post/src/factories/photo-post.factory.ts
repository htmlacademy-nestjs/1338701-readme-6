import { Injectable } from '@nestjs/common'
import { EntityFactory, IPost, PostType } from '@project/shared/core'
import { FactoriesType } from 'libs/post/blog-post/src/decorators/factories-type.decorator'
import { PhotoPostEntity } from 'libs/post/blog-post/src/entities/photo-post.entity'

@Injectable()
@FactoriesType(PostType.Photo)
export class PhotoPostFactory implements EntityFactory<PhotoPostEntity> {
  create(entityPlainData: IPost): PhotoPostEntity {
    return new PhotoPostEntity(entityPlainData)
  }
}
