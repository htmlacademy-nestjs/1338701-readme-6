import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import uploadConfig from './upload-config.config'

const ENV_FILE_PATH = 'apps/upload/.env'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [uploadConfig],
      envFilePath: ENV_FILE_PATH
    })
  ]
})
export class UploadConfigModule {}
