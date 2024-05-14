/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { RequestIdInterceptor } from '@project/interceptors'

import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const globalPrefix = 'api'
  app.useGlobalInterceptors(new RequestIdInterceptor())

  const config = new DocumentBuilder().setTitle('Api Gateway').setVersion('1.0.0').build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(globalPrefix, app, document)
  app.setGlobalPrefix(globalPrefix)
  const port = process.env.PORT || 3000
  await app.listen(port)
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`)
}

bootstrap()
