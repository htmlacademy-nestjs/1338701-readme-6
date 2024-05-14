import { Controller } from '@nestjs/common'
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq'
import { IPost, RabbitExchange, RabbitQueue, RabbitRouting } from '@project/shared/core'
import { MailService } from 'libs/notification/email-subscriber/src/email-subscriber-module/mail-module/mail.service'

import { EmailSubscriberService } from './email-subscriber.service'
import { CreateSubscriberDto } from './dto/create-subscriber.dto'

@Controller()
export class EmailSubscriberController {
  constructor(private readonly subscriberService: EmailSubscriberService, private readonly mailService: MailService) {}

  @RabbitSubscribe({
    exchange: RabbitExchange.Income,
    routingKey: RabbitRouting.AddSubscriber,
    queue: RabbitQueue.Income
  })
  public async create(subscriber: CreateSubscriberDto) {
    await this.subscriberService.addSubscriber(subscriber)
    await this.mailService.sendNotifyNewSubscriber(subscriber)
  }

  @RabbitSubscribe({
    exchange: RabbitExchange.SendPosts,
    routingKey: RabbitRouting.SendPosts,
    queue: RabbitQueue.SendPosts
  })
  public async sendPostNotifications(posts: IPost[]) {
    const subscribers = await this.subscriberService.getAllSubscribers()
    for (const subscriber of subscribers) {
      await this.mailService.sendPostNotification(subscriber, posts)
    }
  }
}
