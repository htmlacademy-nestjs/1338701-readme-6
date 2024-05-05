import { Injectable } from '@nestjs/common'
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { IPost, RabbitExchange, RabbitRouting } from '@project/shared/core'

@Injectable()
export class PostNotificationService {
  constructor(private readonly rabbitClient: AmqpConnection) {}

  public async sendPosts(posts: IPost[]) {
    await this.rabbitClient.publish<IPost[]>(RabbitExchange.SendPosts, RabbitRouting.SendPosts, posts)
  }
}
