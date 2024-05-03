import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { BaseMongoRepository } from '@project/data-access'
import { FileModel } from 'libs/upload-library/uploader/src/uploader-module/file.model'
import { UploaderEntity } from 'libs/upload-library/uploader/src/uploader-module/uploader.entity'
import { UploaderFactory } from 'libs/upload-library/uploader/src/uploader-module/uploader.factory'
import { Model } from 'mongoose'

@Injectable()
export class UploaderRepository extends BaseMongoRepository<UploaderEntity, FileModel> {
  constructor(entityFactory: UploaderFactory, @InjectModel(FileModel.name) fileModel: Model<FileModel>) {
    super(entityFactory, fileModel)
  }
}
