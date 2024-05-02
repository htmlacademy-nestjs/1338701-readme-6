import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { UploaderController } from 'libs/upload-library/uploader/src/uploader-module/uploader.controller'
import { UploaderService } from 'libs/upload-library/uploader/src/uploader-module/uploader.service'

const SERVE_ROOT = '/static'

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = configService.get<string>('upload-service.uploadDirectory')
        return [
          {
            rootPath,
            serveRoot: SERVE_ROOT,
            serveStaticOptions: {
              fallthrough: true,
              etag: true
            }
          }
        ]
      }
    })
  ],
  providers: [UploaderService],
  controllers: [UploaderController]
})
export class UploaderModule {}
