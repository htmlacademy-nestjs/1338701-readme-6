import 'multer'
import { Express } from 'express'
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { UploaderService } from 'libs/upload-library/uploader/src/uploader-module/uploader.service'

@Controller('uploader')
export class UploaderController {
  constructor(private readonly uploaderModuleService: UploaderService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file)
    return this.uploaderModuleService.saveFile(file)
  }
}
