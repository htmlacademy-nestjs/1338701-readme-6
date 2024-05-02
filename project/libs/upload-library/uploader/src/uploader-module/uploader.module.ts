import { Module } from '@nestjs/common'
import { UploaderController } from 'libs/upload-library/uploader/src/uploader-module/uploader.controller'
import { UploaderService } from 'libs/upload-library/uploader/src/uploader-module/uploader.service'

@Module({
  imports: [],
  providers: [UploaderService],
  controllers: [UploaderController]
})
export class UploaderModule {}
