import { MongooseModuleAsyncOptions } from '@nestjs/mongoose'
import { ConfigService } from '@nestjs/config'

import { getMongoConnectionString } from '@project/shared/helpers'

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>('upload-service.db.user') as string,
          password: config.get<string>('upload-service.db.password') as string,
          host: config.get<string>('upload-service.db.host') as string,
          port: config.get<string>('upload-service.db.port') as string,
          authDatabase: config.get<string>('upload-service.db.authBase') as string,
          databaseName: config.get<string>('upload-service.db.name') as string
        })
      }
    },
    inject: [ConfigService]
  }
}
