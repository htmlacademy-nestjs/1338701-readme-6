import { Injectable } from '@nestjs/common'
import { BlogTagEntity } from '@project/blog-tag'
import { IPost, PostType } from '@project/shared/core'
import { FactoriesType } from 'libs/post/blog-post/src/blog-post-module/decorators/factories-type.decorator'
import { CreatePostDto } from 'libs/post/blog-post/src/blog-post-module/dto/create-post.dto'
import { LinkPostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/link-post.entity'
import { IPostFactory } from 'libs/post/blog-post/src/blog-post-module/factories/types/post-factory.interface'

@Injectable()
@FactoriesType(PostType.Link)
export class LinkPostFactory implements IPostFactory<LinkPostEntity> {
  create(entityPlainData: IPost): LinkPostEntity {
    return new LinkPostEntity(entityPlainData)
  }

  createFromCreatePostDto(dto: CreatePostDto, tags: BlogTagEntity[]): LinkPostEntity {
    return LinkPostEntity.fromDto(dto, tags)
  }
}
