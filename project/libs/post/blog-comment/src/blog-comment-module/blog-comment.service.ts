import { Injectable } from '@nestjs/common'
import { BlogCommentEntity } from 'libs/post/blog-comment/src/blog-comment-module/blog-comment.entity'
import { BlogCommentRepository } from 'libs/post/blog-comment/src/blog-comment-module/blog-comment.repository'
import { BlogTagEntity } from 'libs/post/blog-tag/src/blog-tag-module/blog-tag.entity'

@Injectable()
export class BlogCommentService {
  constructor(private readonly blogCommentRepository: BlogCommentRepository) {}

  public async getComments(postId: string): Promise<BlogCommentEntity[]> {
    return await this.blogCommentRepository.findByPostId(postId)
  }
}
