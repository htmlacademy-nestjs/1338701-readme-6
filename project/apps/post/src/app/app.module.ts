import { Module } from '@nestjs/common'
import { BlogPostModule } from '@project/blog-post'

@Module({
  imports: [BlogPostModule]
})
export class AppModule {}
