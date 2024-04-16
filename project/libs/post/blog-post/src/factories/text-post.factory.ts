import { Injectable } from '@nestjs/common'
import { EntityFactory, IPost, IPostText, PostType } from '@project/shared/core'
import { FactoriesType } from 'libs/post/blog-post/src/decorators/factories-type.decorator'
import { TextPostEntity } from 'libs/post/blog-post/src/entities/text-post.entity'

@Injectable()
@FactoriesType(PostType.Text)
export class TextPostFactory implements EntityFactory<TextPostEntity> {
  create(entityPlainData: IPost): TextPostEntity {
    return new TextPostEntity(entityPlainData)
  }
}
