import { Module } from '@nestjs/common'
import { BlogTagController } from './blog-tag.controller'
import { BlogTagService } from './blog-tag.service'

@Module({
  controllers: [BlogTagController],
  providers: [BlogTagService]
})
export class BlogTagModule {}
