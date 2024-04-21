import { Injectable } from '@nestjs/common'
import { BlogTagEntity } from '@project/blog-tag'
import { IPost, PostType } from '@project/shared/core'
import { FactoriesType } from 'libs/post/blog-post/src/blog-post-module/decorators/factories-type.decorator'
import { CreatePostDto } from 'libs/post/blog-post/src/blog-post-module/dto/create-post.dto'
import { VideoPostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/video-post.entity'
import { IPostFactory } from 'libs/post/blog-post/src/blog-post-module/factories/types/post-factory.interface'

@Injectable()
@FactoriesType(PostType.Video)
export class VideoPostFactory implements IPostFactory<VideoPostEntity> {
  create(entityPlainData: IPost): VideoPostEntity {
    return new VideoPostEntity(entityPlainData)
  }

  createFromCreatePostDto(dto: CreatePostDto, tags: BlogTagEntity[]): VideoPostEntity {
    return VideoPostEntity.fromDto(dto, tags)
  }
}
