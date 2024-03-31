import { Module } from '@nestjs/common'
import { BlogUserService, BlogUserRepository, BlogUserFactory, BlogUserController } from '@project/blog-user'

@Module({
  providers: [BlogUserService, BlogUserRepository, BlogUserFactory],
  exports: [BlogUserRepository],
  controllers: [BlogUserController]
})
export class BlogUserModule {}
