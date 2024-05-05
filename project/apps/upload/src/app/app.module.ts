import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { getMongooseOptions, UploadConfigModule } from '@project/upload-config'
import { UploaderModule } from '@project/uploader'

@Module({
  imports: [UploadConfigModule, UploaderModule, MongooseModule.forRootAsync(getMongooseOptions())],
  controllers: [],
  providers: []
})
export class AppModule {}
