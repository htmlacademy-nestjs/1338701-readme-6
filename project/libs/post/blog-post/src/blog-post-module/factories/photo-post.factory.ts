import { Injectable } from '@nestjs/common'
import { BlogTagEntity } from '@project/blog-tag'
import { IPost, PostType } from '@project/shared/core'
import { FactoriesType } from 'libs/post/blog-post/src/blog-post-module/decorators/factories-type.decorator'
import { CreatePostDto } from 'libs/post/blog-post/src/blog-post-module/dto/create-post.dto'
import { PhotoPostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/photo-post.entity'
import { IPostFactory } from 'libs/post/blog-post/src/blog-post-module/factories/types/post-factory.interface'

@Injectable()
@FactoriesType(PostType.Photo)
export class PhotoPostFactory implements IPostFactory<PhotoPostEntity> {
  create(entityPlainData: IPost): PhotoPostEntity {
    return new PhotoPostEntity(entityPlainData)
  }

  createFromCreatePostDto(dto: CreatePostDto, tags: BlogTagEntity[]): PhotoPostEntity {
    return PhotoPostEntity.fromDto(dto, tags)
  }
}
