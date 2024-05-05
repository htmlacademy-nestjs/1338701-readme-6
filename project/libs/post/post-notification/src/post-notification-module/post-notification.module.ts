import { Module } from '@nestjs/common'
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'

import { getRabbitMQOptions } from '@project/shared/helpers'
import { PostNotificationService } from 'libs/post/post-notification/src/post-notification-module/post-notification.service'

@Module({
  imports: [RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitMQOptions('rabbit-post'))],
  providers: [PostNotificationService],
  exports: [PostNotificationService]
})
export class PostNotificationModule {}
