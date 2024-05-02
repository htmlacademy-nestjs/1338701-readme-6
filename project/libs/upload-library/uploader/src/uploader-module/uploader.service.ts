import 'multer'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ensureDir } from 'fs-extra'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

@Injectable()
export class UploaderService {
  private readonly logger = new Logger(UploaderService.name)

  constructor(private readonly configService: ConfigService) {}

  private getUploadDirectoryPath() {
    return this.configService.get<string>('application.uploadDirectory') as string
  }

  private getDestinationFilePath(filename: string) {
    return join(this.getUploadDirectoryPath(), filename)
  }

  public async saveFile(file: Express.Multer.File): Promise<string> {
    try {
      const uploadDirectoryPath = this.getUploadDirectoryPath()
      const destinationFile = this.getDestinationFilePath(file.originalname)
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
