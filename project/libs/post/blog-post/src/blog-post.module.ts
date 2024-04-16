import { Module } from '@nestjs/common'
import { PrismaClientModule } from '@project/post-models'
import { BlogPostController } from 'libs/post/blog-post/src/blog-post.controller'
import { BlogPostService } from 'libs/post/blog-post/src/blog-post.service'
import { FactoryTypeFactory } from 'libs/post/blog-post/src/factories/factory-type.factory'
import { LinkPostFactory } from 'libs/post/blog-post/src/factories/link-post.factory'
import { PhotoPostFactory } from 'libs/post/blog-post/src/factories/photo-post.factory'
import { QuotePostFactory } from 'libs/post/blog-post/src/factories/quote-post.factory'
import { RepositoryTypeFactory } from 'libs/post/blog-post/src/factories/repository-type.factory'
import { TextPostFactory } from 'libs/post/blog-post/src/factories/text-post.factory'
import { VideoPostFactory } from 'libs/post/blog-post/src/factories/video-post.factory'
import { LinkPostRepository } from 'libs/post/blog-post/src/repositories/link-post.repository'
import { PhotoPostRepository } from 'libs/post/blog-post/src/repositories/photo-post.repository'
import { QuotePostRepository } from 'libs/post/blog-post/src/repositories/quote-post.repository'
import { TextPostRepository } from 'libs/post/blog-post/src/repositories/text-post.repository'
import { VideoPostRepository } from 'libs/post/blog-post/src/repositories/video-post.repository'

@Module({
  imports: [PrismaClientModule],
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
