import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import notificationConfig from './notification-config.config'

const ENV_FILE_PATH = 'apps/notify/.env'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [notificationConfig],
      envFilePath: ENV_FILE_PATH
    })
  ]
})
export class NotifyConfigModule {}
