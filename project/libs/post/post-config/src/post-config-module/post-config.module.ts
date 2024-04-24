import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import postConfig from 'libs/post/post-config/src/post-config-module/configurations/post.config'
import { ENV_USERS_FILE_PATH } from 'libs/user/config/src/account-config-module/account-config.constant'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [postConfig],
      envFilePath: ENV_USERS_FILE_PATH
    })
  ]
})
export class PostConfigModule {}
