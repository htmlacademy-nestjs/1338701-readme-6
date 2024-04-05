import { Module } from '@nestjs/common'
import { BlogUserController } from 'libs/user/blog-user/src/blog-user.controller'
import { BlogUserService } from 'libs/user/blog-user/src/blog-user.service'
import { BlogUserFactory } from 'libs/user/blog-user/src/blog-user.factory'
import { BlogUserRepository } from 'libs/user/blog-user/src/blog-user.repository'

@Module({
  providers: [BlogUserService, BlogUserRepository, BlogUserFactory],
  controllers: [BlogUserController],
  exports: [BlogUserRepository]
})
export class BlogUserModule {}
