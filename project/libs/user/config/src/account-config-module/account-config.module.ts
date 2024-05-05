import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ENV_USERS_FILE_PATH } from 'libs/user/config/src/account-config-module/account-config.constant'

import applicationConfig from 'libs/user/config/src/account-config-module/configurations/app.config'
import jwtConfig from 'libs/user/config/src/account-config-module/configurations/jwt.config'
import mongoConfig from 'libs/user/config/src/account-config-module/configurations/mongo.config'
import rabbitConfig from 'libs/user/config/src/account-config-module/configurations/rabbit.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig, mongoConfig, jwtConfig, rabbitConfig],
      envFilePath: ENV_USERS_FILE_PATH
    })
  ]
})
export class AccountConfigModule {}
