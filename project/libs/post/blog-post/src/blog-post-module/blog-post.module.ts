import { Module } from '@nestjs/common'
import { BlogPostController } from 'libs/post/blog-post/src/blog-post-module/blog-post.controller'
import { BlogPostService } from 'libs/post/blog-post/src/blog-post-module/blog-post.service'
import { FactoryTypeFactory } from 'libs/post/blog-post/src/blog-post-module/factories/factory-type.factory'
import { LinkPostFactory } from 'libs/post/blog-post/src/blog-post-module/factories/link-post.factory'
import { RepositoryTypeFactory } from 'libs/post/blog-post/src/blog-post-module/factories/repository-type.factory'
import { VideoPostFactory } from 'libs/post/blog-post/src/blog-post-module/factories/video-post.factory'
import { LinkPostRepository } from 'libs/post/blog-post/src/blog-post-module/repositories/link-post.repository'
import { VideoPostRepository } from 'libs/post/blog-post/src/blog-post-module/repositories/video-post.repository'

@Module({
  providers: [
    RepositoryTypeFactory,
    FactoryTypeFactory,
    BlogPostService,
    LinkPostFactory,
    LinkPostRepository,
    VideoPostRepository,
    VideoPostFactory
  ],
  controllers: [BlogPostController]
})
export class BlogPostModule {}
