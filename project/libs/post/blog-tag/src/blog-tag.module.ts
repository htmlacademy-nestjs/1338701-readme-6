import { Module } from '@nestjs/common'
import { PrismaClientModule } from '@project/post-models'
import { BlogTagFactory } from 'libs/post/blog-tag/src/blog-tag.factory'
import { BlogTagRepository } from 'libs/post/blog-tag/src/blog-tag.repository'
import { BlogTagController } from './blog-tag.controller'
import { BlogTagService } from './blog-tag.service'

@Module({
  imports: [PrismaClientModule],
  controllers: [BlogTagController],
  providers: [BlogTagService, BlogTagRepository, BlogTagFactory]
})
export class BlogTagModule {}
