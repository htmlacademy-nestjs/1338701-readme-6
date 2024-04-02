import { Module } from '@nestjs/common'
import { BlogPostController } from 'libs/post/blog-post/src/blog-post-module/blog-post.controller'
import { BlogPostFactory } from 'libs/post/blog-post/src/blog-post-module/blog-post.factory'
import { BlogPostService } from 'libs/post/blog-post/src/blog-post-module/blog-post.service'
import { PostContentFactory } from 'libs/post/blog-post/src/blog-post-module/factories/post-content.factory'
import { LinkPostRepository } from 'libs/post/blog-post/src/blog-post-module/repositories/link-post.repository'

@Module({
  providers: [PostContentFactory, LinkPostRepository, BlogPostService, BlogPostFactory],
  controllers: [BlogPostController]
})
export class BlogPostModule {}
