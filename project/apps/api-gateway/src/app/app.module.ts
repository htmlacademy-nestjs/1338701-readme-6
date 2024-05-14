import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from 'apps/api-gateway/src/app/app.config'
import { CheckNoAuthGuard } from 'apps/api-gateway/src/app/guards/check-no-auth.guard'
import { PostController } from 'apps/api-gateway/src/app/post.controller'
import { CheckAuthGuard } from 'apps/api-gateway/src/app/guards/check-auth.guard'
import { PostService } from 'apps/api-gateway/src/app/post.service'
import { TagController } from 'apps/api-gateway/src/app/tag.controller'
import { UsersController } from 'apps/api-gateway/src/app/users.controller'

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS
    })
  ],
  controllers: [UsersController, PostController, TagController],
  providers: [CheckAuthGuard, PostService, CheckNoAuthGuard]
})
export class AppModule {}
