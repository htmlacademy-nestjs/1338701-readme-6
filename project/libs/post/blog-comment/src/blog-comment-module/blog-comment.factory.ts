import { Injectable } from '@nestjs/common'
import { IEntityFactory, IComment } from '@project/shared/core'
import { BlogCommentEntity } from 'libs/post/blog-comment/src/blog-comment-module/blog-comment.entity'

@Injectable()
export class BlogCommentFactory implements IEntityFactory<BlogCommentEntity> {
  public create(entityPlainData: IComment): BlogCommentEntity {
    return new BlogCommentEntity(entityPlainData)
  }
}
