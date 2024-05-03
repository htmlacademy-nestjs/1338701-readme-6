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
    exchange: 'typoteka.notify.income',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'typoteka.notify.income'
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber)
    this.mailService.sendNotifyNewSubscriber(subscriber)
  }
}
