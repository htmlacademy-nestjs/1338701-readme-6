import { Module } from '@nestjs/common'
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'

import { getRabbitMQOptions } from '@project/shared/helpers'

import { UserNotificationService } from 'libs/user/user-notification/src/user-notification-module/user-notification.service'

@Module({
  imports: [RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitMQOptions('rabbit'))],
  providers: [UserNotificationService],
  exports: [UserNotificationService]
})
export class UserNotificationModule {}
