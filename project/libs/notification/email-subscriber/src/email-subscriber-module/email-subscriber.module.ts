import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { EmailSubscriberController } from 'libs/notification/email-subscriber/src/email-subscriber-module/email-subscriber.controller'
import { MailModule } from 'libs/notification/email-subscriber/src/email-subscriber-module/mail-module/mail.module'

import { EmailSubscriberModel, EmailSubscriberSchema } from './email-subscriber.model'
import { EmailSubscriberService } from './email-subscriber.service'
import { EmailSubscriberRepository } from './email-subscriber.repository'
import { EmailSubscriberFactory } from './email-subscriber.factory'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: EmailSubscriberModel.name, schema: EmailSubscriberSchema }]),
    MailModule
  ],
  providers: [EmailSubscriberService, EmailSubscriberRepository, EmailSubscriberFactory],
  controllers: [EmailSubscriberController]
})
export class EmailSubscriberModule {}
