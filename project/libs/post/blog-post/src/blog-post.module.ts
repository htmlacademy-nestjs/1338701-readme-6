import { Module } from '@nestjs/common'
import { BlogPostController } from 'libs/post/blog-post/src/blog-post-module/blog-post.controller'
import { BlogPostService } from 'libs/post/blog-post/src/blog-post-module/blog-post.service'
import { PhotoPostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/photo-post.entity'
import { QuotePostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/quote-post.entity'
import { TextPostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/text-post.entity'
import { FactoryTypeFactory } from 'libs/post/blog-post/src/blog-post-module/factories/factory-type.factory'
import { LinkPostFactory } from 'libs/post/blog-post/src/blog-post-module/factories/link-post.factory'
import { PhotoPostFactory } from 'libs/post/blog-post/src/blog-post-module/factories/photo-post.factory'
import { QuotePostFactory } from 'libs/post/blog-post/src/blog-post-module/factories/quote-post.factory'
import { RepositoryTypeFactory } from 'libs/post/blog-post/src/blog-post-module/factories/repository-type.factory'
import { TextPostFactory } from 'libs/post/blog-post/src/blog-post-module/factories/text-post.factory'
import { VideoPostFactory } from 'libs/post/blog-post/src/blog-post-module/factories/video-post.factory'
import { LinkPostRepository } from 'libs/post/blog-post/src/blog-post-module/repositories/link-post.repository'
import { PhotoPostRepository } from 'libs/post/blog-post/src/blog-post-module/repositories/photo-post.repository'
import { QuotePostRepository } from 'libs/post/blog-post/src/blog-post-module/repositories/quote-post.repository'
import { TextPostRepository } from 'libs/post/blog-post/src/blog-post-module/repositories/text-post.repository'
import { VideoPostRepository } from 'libs/post/blog-post/src/blog-post-module/repositories/video-post.repository'

@Module({
  providers: [
    RepositoryTypeFactory,
    FactoryTypeFactory,
    BlogPostService,
    LinkPostFactory,
    LinkPostRepository,
    VideoPostRepository,
    VideoPostFactory,
    PhotoPostRepository,
    PhotoPostFactory,
    TextPostRepository,
    TextPostFactory,
    QuotePostRepository,
    QuotePostFactory
  ],
  controllers: [BlogPostController]
})
export class BlogPostModule {}
