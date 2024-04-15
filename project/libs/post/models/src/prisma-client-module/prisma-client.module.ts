import { Global, Module } from '@nestjs/common'

import { PrismaClientService } from 'libs/post/models/src/prisma-client-module/prisma-client.service'

@Global()
@Module({
  providers: [PrismaClientService],
  exports: [PrismaClientService]
})
export class PrismaClientModule {}
