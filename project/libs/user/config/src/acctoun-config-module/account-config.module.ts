import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ENV_USERS_FILE_PATH } from 'libs/user/config/src/acctoun-config-module/account-config.constant'

import applicationConfig from 'libs/user/config/src/acctoun-config-module/configurations/app.config'
import mongoConfig from 'libs/user/config/src/acctoun-config-module/configurations/mongo.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig, mongoConfig],
      envFilePath: ENV_USERS_FILE_PATH
    })
  ]
})
export class AccountConfigModule {}
