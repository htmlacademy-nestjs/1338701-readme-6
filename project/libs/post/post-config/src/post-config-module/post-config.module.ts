import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ENV_POST_FILE_PATH } from 'libs/post/post-config/src/post-config-module/post-config.constant'
import rabbitPostConfig from './configurations/rabbit.config'
import postConfig from 'libs/post/post-config/src/post-config-module/configurations/post.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [postConfig, rabbitPostConfig],
      envFilePath: ENV_POST_FILE_PATH
    })
  ]
})
export class PostConfigModule {}
