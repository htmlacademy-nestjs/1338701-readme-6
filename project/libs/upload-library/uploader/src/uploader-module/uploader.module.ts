import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ServeStaticModule } from '@nestjs/serve-static'
import { FileModel, FileSchema } from 'libs/upload-library/uploader/src/uploader-module/file.model'
import { UploaderController } from 'libs/upload-library/uploader/src/uploader-module/uploader.controller'
import { UploaderFactory } from 'libs/upload-library/uploader/src/uploader-module/uploader.factory'
import { UploaderRepository } from 'libs/upload-library/uploader/src/uploader-module/uploader.repository'
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
    }),
    MongooseModule.forFeature([{ name: FileModel.name, schema: FileSchema }])
  ],
  providers: [UploaderService, UploaderRepository, UploaderFactory],
  controllers: [UploaderController]
})
export class UploaderModule {}
