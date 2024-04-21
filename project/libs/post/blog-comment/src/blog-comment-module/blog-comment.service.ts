import { Injectable } from '@nestjs/common'
import { BlogCommentEntity } from 'libs/post/blog-comment/src/blog-comment-module/blog-comment.entity'
import { BlogCommentRepository } from 'libs/post/blog-comment/src/blog-comment-module/blog-comment.repository'

@Injectable()
export class BlogCommentService {
  constructor(private readonly blogCommentRepository: BlogCommentRepository) {}

  public async getComments(postId: string): Promise<BlogCommentEntity[]> {
    return await this.blogCommentRepository.findByPostId(postId)
  }
}
