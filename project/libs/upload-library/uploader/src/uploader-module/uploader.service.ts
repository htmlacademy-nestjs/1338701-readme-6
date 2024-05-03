import 'multer'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IStoredFile } from '@project/shared/core'
import { UploaderEntity } from 'libs/upload-library/uploader/src/uploader-module/uploader.entity'
import { UploaderFactory } from 'libs/upload-library/uploader/src/uploader-module/uploader.factory'
import { UploaderRepository } from 'libs/upload-library/uploader/src/uploader-module/uploader.repository'
import { extension } from 'mime-types'
import dayjs from 'dayjs'
import { ensureDir } from 'fs-extra'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'

@Injectable()
export class UploaderService {
  private readonly logger = new Logger(UploaderService.name)
  private readonly DATE_FORMAT = 'YYYY MM'

  constructor(private readonly configService: ConfigService, private readonly uploaderRepository: UploaderRepository) {}

  private getUploadDirectoryPath() {
    return this.configService.get<string>('upload-service.uploadDirectory') as string
  }

  private getSubUploadDirectoryPath(): string {
    const [year, month] = dayjs().format(this.DATE_FORMAT).split(' ')
    return join(year, month)
  }

  private getDestinationFilePath(filename: string): string {
    return join(this.getUploadDirectoryPath(), this.getSubUploadDirectoryPath(), filename)
  }

  public async writeFile(file: Express.Multer.File): Promise<IStoredFile> {
    try {
      const uploadDirectoryPath = this.getUploadDirectoryPath()
      const subDirectory = this.getSubUploadDirectoryPath()
      const fileExtension = extension(file.mimetype) as string
      const filename = `${randomUUID()}.${fileExtension}`

      const path = this.getDestinationFilePath(filename)

      await ensureDir(join(uploadDirectoryPath, subDirectory))
      await writeFile(path, file.buffer)

      return {
        fileExtension,
        filename,
        path,
        subDirectory
      }
    } catch (e) {
      const error = e as Error
      this.logger.error(`Error while saving file: ${error.message}`)
      throw new Error(`Can't save file`)
    }
  }

  public async saveFile(file: Express.Multer.File): Promise<UploaderEntity> {
    const storedFile = await this.writeFile(file)
    const fileEntity = new UploaderFactory().create({
      hashName: storedFile.filename,
      mimetype: file.mimetype,
      originalName: file.originalname,
      path: storedFile.path,
      size: file.size,
      subDirectory: storedFile.subDirectory,
      createdAt: undefined,
      updatedAt: undefined
    })

    await this.uploaderRepository.save(fileEntity)
    return fileEntity
  }

  public async getFile(fileId: string): Promise<UploaderEntity> {
    const existFile = await this.uploaderRepository.findById(fileId)
    if (!existFile) {
      throw new NotFoundException(`File with ${fileId} not found.`)
    }

    return existFile
  }
}
