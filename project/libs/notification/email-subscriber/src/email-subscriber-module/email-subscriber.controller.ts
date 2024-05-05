import { Controller } from '@nestjs/common'
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq'
import { RabbitRouting } from '@project/shared/core'
import { MailService } from 'libs/notification/email-subscriber/src/email-subscriber-module/mail-module/mail.service'

import { EmailSubscriberService } from './email-subscriber.service'
import { CreateSubscriberDto } from './dto/create-subscriber.dto'

@Controller()
export class EmailSubscriberController {
  constructor(private readonly subscriberService: EmailSubscriberService, private readonly mailService: MailService) {}

  @RabbitSubscribe({
    exchange: 'readme.notification.income',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'readme.notification.income'
  })
  public async create(subscriber: CreateSubscriberDto) {
    await this.subscriberService.addSubscriber(subscriber)
    await this.mailService.sendNotifyNewSubscriber(subscriber)
  }
}
