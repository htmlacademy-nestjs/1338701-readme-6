import { Injectable } from '@nestjs/common'
import { EntityFactory, IPost, PostType } from '@project/shared/core'
import { FactoriesType } from 'libs/post/blog-post/src/blog-post-module/decorators/factories-type.decorator'
import { PhotoPostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/photo-post.entity'

@Injectable()
@FactoriesType(PostType.Photo)
export class PhotoPostFactory implements EntityFactory<PhotoPostEntity> {
  create(entityPlainData: IPost): PhotoPostEntity {
    return new PhotoPostEntity(entityPlainData)
  }
}
