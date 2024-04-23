import { Module } from '@nestjs/common'
import { PrismaClientModule } from '@project/post-models'
import { BlogCommentController } from 'libs/post/blog-comment/src/blog-comment-module/blog-comment.controller'
import { BlogCommentFactory } from 'libs/post/blog-comment/src/blog-comment-module/blog-comment.factory'
import { BlogCommentRepository } from 'libs/post/blog-comment/src/blog-comment-module/blog-comment.repository'
import { BlogCommentService } from 'libs/post/blog-comment/src/blog-comment-module/blog-comment.service'

@Module({
  imports: [PrismaClientModule],
  controllers: [BlogCommentController],
  providers: [BlogCommentService, BlogCommentRepository, BlogCommentFactory],
  exports: [BlogCommentRepository, BlogCommentFactory]
})
export class BlogCommentModule {}
