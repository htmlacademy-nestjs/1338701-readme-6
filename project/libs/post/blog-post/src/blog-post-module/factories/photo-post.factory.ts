import { EntityFactory, IPost, IPostPhoto } from '@project/shared/core'
import { PhotoPostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/photo-post.entity'

export class PhotoPostFactory implements EntityFactory<PhotoPostEntity> {
  create(entityPlainData: IPost): PhotoPostEntity {
    return new PhotoPostEntity(entityPlainData)
  }
}
