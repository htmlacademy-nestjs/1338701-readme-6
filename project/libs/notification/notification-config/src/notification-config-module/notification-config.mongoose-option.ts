import { MongooseModuleAsyncOptions } from '@nestjs/mongoose'
import { ConfigService } from '@nestjs/config'

import { getMongoConnectionString } from '@project/shared/helpers'

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>('notification-config.db.user') as string,
          password: config.get<string>('notification-config.db.password') as string,
          host: config.get<string>('notification-config.db.host') as string,
          port: config.get<string>('notification-config.db.port') as string,
          authDatabase: config.get<string>('notification-config.db.authBase') as string,
          databaseName: config.get<string>('notification-config.db.name') as string
        })
      }
    },
    inject: [ConfigService]
  }
}
