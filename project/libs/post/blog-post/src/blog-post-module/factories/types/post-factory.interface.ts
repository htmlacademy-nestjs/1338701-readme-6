import { BlogTagEntity } from '@project/blog-tag'
import { IEntityFactory, StorableEntity } from '@project/shared/core'
import { CreatePostDto } from 'libs/post/blog-post/src/blog-post-module/dto/create-post.dto'

export interface IPostFactory<T extends StorableEntity<ReturnType<T['toPOJO']>>> extends IEntityFactory<T> {
  createFromCreatePostDto(dto: CreatePostDto, tags: BlogTagEntity[]): T
}
