import { Injectable } from '@nestjs/common'
import { BlogTagEntity } from '@project/blog-tag'
import { IPost, PostType } from '@project/shared/core'
import { FactoriesType } from 'libs/post/blog-post/src/blog-post-module/decorators/factories-type.decorator'
import { CreatePostDto } from 'libs/post/blog-post/src/blog-post-module/dto/create-post.dto'
import { TextPostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/text-post.entity'
import { IPostFactory } from 'libs/post/blog-post/src/blog-post-module/factories/types/post-factory.interface'

@Injectable()
@FactoriesType(PostType.Text)
export class TextPostFactory implements IPostFactory<TextPostEntity> {
  create(entityPlainData: IPost): TextPostEntity {
    return new TextPostEntity(entityPlainData)
  }

  createFromCreatePostDto(dto: CreatePostDto, tags: BlogTagEntity[]): TextPostEntity {
    return TextPostEntity.fromDto(dto, tags)
  }
}
