import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { BlogUserController } from 'libs/user/blog-user/src/blog-user-module/blog-user.controller'
import { BlogUserService } from 'libs/user/blog-user/src/blog-user-module/blog-user.service'
import { BlogUserFactory } from 'libs/user/blog-user/src/blog-user-module/blog-user.factory'
import { BlogUserRepository } from 'libs/user/blog-user/src/blog-user-module/blog-user.repository'
import { BlogUserModel, BlogUserSchema } from 'libs/user/blog-user/src/blog-user-module/bog-user.model'

@Module({
  imports: [MongooseModule.forFeature([{ name: BlogUserModel.name, schema: BlogUserSchema }])],
  providers: [BlogUserService, BlogUserRepository, BlogUserFactory],
  controllers: [BlogUserController],
  exports: [BlogUserRepository]
})
export class BlogUserModule {}
