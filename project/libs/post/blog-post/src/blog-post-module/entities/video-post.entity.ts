import { BlogTagEntity } from '@project/blog-tag'
import { IPost, IPostVideo, StorableEntity } from '@project/shared/core'
import { CreatePostDto } from 'libs/post/blog-post/src/blog-post-module/dto/create-post.dto'
import { BasePostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/base-post.entity'

export class VideoPostEntity extends BasePostEntity implements StorableEntity<IPost> {
  protected postVideo?: IPostVideo

  constructor(post?: IPost) {
    super(post)
    if (post) {
      this.postVideo = post.postVideo
    }
  }

  static fromDto(dto: CreatePostDto, tags: BlogTagEntity[]): VideoPostEntity {
    const baseEntity = super.fromDto(dto, tags)
    const entity = new VideoPostEntity()
    Object.assign(entity, baseEntity)
    entity.postVideo = dto.postVideo
    return entity
  }

  toPOJO(): IPost {
    return {
      ...super.toPOJO(),
      postVideo: this.postVideo
    }
  }
}
