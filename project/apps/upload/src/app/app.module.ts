import { Module } from '@nestjs/common'
import { UploadConfigModule } from '@project/upload-config'
import { UploaderModule } from '@project/uploader'

@Module({
  imports: [UploadConfigModule, UploaderModule],
  controllers: [],
  providers: []
})
export class AppModule {}
