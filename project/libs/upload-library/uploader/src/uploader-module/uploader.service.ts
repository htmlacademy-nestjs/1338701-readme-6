import 'multer'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { extension } from 'mime-types'
import dayjs from 'dayjs'
import { ensureDir } from 'fs-extra'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'

@Injectable()
export class UploaderService {
  private readonly logger = new Logger(UploaderService.name)

  constructor(private readonly configService: ConfigService) {}

  private getUploadDirectoryPath() {
    const [year, month] = dayjs().format('YYYY MM').split(' ')
    const path = this.configService.get<string>('upload-service.uploadDirectory') as string
    return join(path, year, month)
  }

  private getDestinationFilePath(filename: string) {
    return join(this.getUploadDirectoryPath(), filename)
  }

  public async saveFile(file: Express.Multer.File): Promise<string> {
    try {
      const uploadDirectoryPath = this.getUploadDirectoryPath()
      const filename = randomUUID()
      // TODO: Считывает из mimetype формат 'text/plain', в результате чего файл приводится к формату txt.
      const fileExtension = extension(file.mimetype)

      const destinationFile = this.getDestinationFilePath(`${filename}.${fileExtension}`)
      await ensureDir(uploadDirectoryPath)
      await writeFile(destinationFile, file.buffer)

      return destinationFile
    } catch (e) {
      const error = e as Error
      this.logger.error(`Error while saving file: ${error.message}`)
      throw new Error(`Can't save file`)
    }
  }
}
