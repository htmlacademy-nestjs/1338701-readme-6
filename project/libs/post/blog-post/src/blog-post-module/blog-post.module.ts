import { Module } from '@nestjs/common'
import { BlogPostController } from 'libs/post/blog-post/src/blog-post-module/blog-post.controller'
import { BlogPostFactory } from 'libs/post/blog-post/src/blog-post-module/blog-post.factory'
import { BlogPostRepository } from 'libs/post/blog-post/src/blog-post-module/blog-post.repository'
import { BlogPostService } from 'libs/post/blog-post/src/blog-post-module/blog-post.service'

@Module({
  providers: [BlogPostRepository, BlogPostService, BlogPostFactory],
  controllers: [BlogPostController]
})
export class BlogPostModule {}
