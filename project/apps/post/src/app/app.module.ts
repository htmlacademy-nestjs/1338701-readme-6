import { Module } from '@nestjs/common'
import { BlogCommentModule } from '@project/blog-comment'
import { BlogPostModule } from '@project/blog-post'
import { BlogTagModule } from '@project/blog-tag'
import { PostConfigModule } from '@project/post-config'
import { PostNotificationModule } from '@project/post-notification'

@Module({
  imports: [BlogPostModule, BlogTagModule, BlogCommentModule, PostConfigModule, PostNotificationModule]
})
export class AppModule {}
