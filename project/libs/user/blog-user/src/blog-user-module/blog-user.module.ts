import { Module } from '@nestjs/common'
import { BlogUserController } from './blog-user.controller'
import { BlogUserService } from 'libs/user/blog-user/src/blog-user-module/blog-user.service'
import { BlogUserFactory } from './blog-user.factory'
import { BlogUserRepository } from './blog-user.repository'

@Module({
  providers: [BlogUserService, BlogUserRepository, BlogUserFactory],
  controllers: [BlogUserController],
  exports: [BlogUserRepository]
})
export class BlogUserModule {}
