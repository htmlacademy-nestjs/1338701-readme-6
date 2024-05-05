import { Inject, Injectable } from '@nestjs/common'
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { ConfigType } from '@nestjs/config'
import { rabbitConfig } from '@project/config'
import { IPost, RabbitRouting } from '@project/shared/core'

@Injectable()
export class PostNotificationService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitConfig>
  ) {}

  public async sendPosts(posts: IPost[]) {
    return this.rabbitClient.publish<IPost[]>(this.rabbiOptions.exchange, RabbitRouting.SendPosts, posts)
  }
}
