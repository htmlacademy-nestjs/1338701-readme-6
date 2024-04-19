import { Module } from '@nestjs/common'
import { PrismaClientModule } from '@project/post-models'
import { BlogTagFactory } from 'libs/post/blog-tag/src/blog-tag-module/blog-tag.factory'
import { BlogTagRepository } from 'libs/post/blog-tag/src/blog-tag-module/blog-tag.repository'
import { BlogTagController } from 'libs/post/blog-tag/src/blog-tag-module/blog-tag.controller'
import { BlogTagService } from 'libs/post/blog-tag/src/blog-tag-module/blog-tag.service'

@Module({
  imports: [PrismaClientModule],
  controllers: [BlogTagController],
  providers: [BlogTagService, BlogTagRepository, BlogTagFactory]
})
export class BlogTagModule {}
