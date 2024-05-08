import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from 'apps/api-gateway/src/app/app.config'
import { BlogController } from 'apps/api-gateway/src/app/blog.controller'
import { CheckAuthGuard } from 'apps/api-gateway/src/app/guards/check-auth.guard'
import { UsersController } from 'apps/api-gateway/src/app/users.controller'

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS
    })
  ],
  controllers: [UsersController, BlogController],
  providers: [CheckAuthGuard]
})
export class AppModule {}
