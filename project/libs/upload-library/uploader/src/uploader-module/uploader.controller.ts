import 'multer'
import { MongoIdValidationPipe } from '@project/pipes'
import { fillDto } from '@project/shared/helpers'
import { Express } from 'express'
import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { UploadedFileRdo } from 'libs/upload-library/uploader/src/uploader-module/rdo/upload-file.rdo'
import { UploaderService } from 'libs/upload-library/uploader/src/uploader-module/uploader.service'

@Controller('uploader')
export class UploaderController {
  constructor(private readonly uploaderModuleService: UploaderService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileEntity = await this.uploaderModuleService.saveFile(file)
    return fillDto(UploadedFileRdo, fileEntity.toPOJO())
  }

  @Get(':fileId')
  public async show(@Param('fileId', MongoIdValidationPipe) fileId: string) {
    const existFile = await this.uploaderModuleService.getFile(fileId)
    return fillDto(UploadedFileRdo, existFile)
  }
}
