import { Injectable } from '@nestjs/common'
import { IEntityFactory, IComment } from '@project/shared/core'
import { BlogCommentEntity } from 'libs/post/blog-comment/src/blog-comment-module/blog-comment.entity'
import { CreateCommentDto } from 'libs/post/blog-comment/src/blog-comment-module/dto/create-comment.dto'

@Injectable()
export class BlogCommentFactory implements IEntityFactory<BlogCommentEntity> {
  public create(entityPlainData: IComment): BlogCommentEntity {
    return new BlogCommentEntity(entityPlainData)
  }

  public createFromDto(dto: CreateCommentDto, postId: string): BlogCommentEntity {
    return new BlogCommentEntity({
      ...dto,
      postId
    })
  }
}
