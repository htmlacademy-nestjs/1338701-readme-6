import { EntityFactory, IPost, IPostText, PostType } from '@project/shared/core'
import { TextPostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/text-post.entity'

export class TextPostFactory implements EntityFactory<TextPostEntity> {
  create(entityPlainData: IPost): TextPostEntity {
    return new TextPostEntity(entityPlainData)
  }
}
