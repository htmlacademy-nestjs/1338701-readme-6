import { Module } from '@nestjs/common'
import { BlogCommentModule } from '@project/blog-comment'
import { BlogTagModule } from '@project/blog-tag'
import { PrismaClientModule } from '@project/post-models'
import { BlogPostController } from 'libs/post/blog-post/src/blog-post-module/blog-post.controller'
import { BlogPostService } from 'libs/post/blog-post/src/blog-post-module/blog-post.service'
import { CommonPostFactory } from 'libs/post/blog-post/src/blog-post-module/factories/common-post.factory'
import { FactoryTypeFactory } from 'libs/post/blog-post/src/blog-post-module/factories/factory-type.factory'
import { LinkPostFactory } from 'libs/post/blog-post/src/blog-post-module/factories/link-post.factory'
import { PhotoPostFactory } from 'libs/post/blog-post/src/blog-post-module/factories/photo-post.factory'
import { QuotePostFactory } from 'libs/post/blog-post/src/blog-post-module/factories/quote-post.factory'
import { RepositoryTypeFactory } from 'libs/post/blog-post/src/blog-post-module/factories/repository-type.factory'
import { TextPostFactory } from 'libs/post/blog-post/src/blog-post-module/factories/text-post.factory'
import { VideoPostFactory } from 'libs/post/blog-post/src/blog-post-module/factories/video-post.factory'
import { CommonPostRepository } from 'libs/post/blog-post/src/blog-post-module/repositories/common-post.repository'
import { LinkPostRepository } from 'libs/post/blog-post/src/blog-post-module/repositories/link-post.repository'
import { PhotoPostRepository } from 'libs/post/blog-post/src/blog-post-module/repositories/photo-post.repository'
import { QuotePostRepository } from 'libs/post/blog-post/src/blog-post-module/repositories/quote-post.repository'
import { TextPostRepository } from 'libs/post/blog-post/src/blog-post-module/repositories/text-post.repository'
import { VideoPostRepository } from 'libs/post/blog-post/src/blog-post-module/repositories/video-post.repository'

@Module({
  imports: [PrismaClientModule, BlogCommentModule, BlogTagModule, BlogCommentModule],
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
    QuotePostFactory,
    CommonPostFactory,
    CommonPostRepository
  ],
  controllers: [BlogPostController]
})
export class BlogPostModule {}
