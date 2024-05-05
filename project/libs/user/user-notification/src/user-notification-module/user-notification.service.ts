import { Injectable } from '@nestjs/common'
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { RabbitExchange, RabbitRouting } from '@project/shared/core'

import { CreateSubscriberDto } from './dto/create-subscriber.dto'

@Injectable()
export class UserNotificationService {
  constructor(private readonly rabbitClient: AmqpConnection) {}

  public async registerSubscriber(dto: CreateSubscriberDto) {
    return this.rabbitClient.publish<CreateSubscriberDto>(RabbitExchange.Income, RabbitRouting.AddSubscriber, {
      ...dto
    })
  }
}
