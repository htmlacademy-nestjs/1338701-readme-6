import { Injectable } from '@nestjs/common'
import { IEntityFactory, IFile } from '@project/shared/core'
import { UploaderEntity } from 'libs/upload-library/uploader/src/uploader-module/uploader.entity'

@Injectable()
export class UploaderFactory implements IEntityFactory<UploaderEntity> {
  public create(entityPlainData: IFile): UploaderEntity {
    return new UploaderEntity(entityPlainData)
  }
}
