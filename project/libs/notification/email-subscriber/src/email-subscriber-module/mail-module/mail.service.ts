import { MailerService } from '@nestjs-modules/mailer'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { NotifcationConfig } from '@project/notification-config'

import { ISubscriber } from '@project/shared/core'

import { EMAIL_ADD_SUBSCRIBER_SUBJECT } from './mail.constant'

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  @Inject(NotifcationConfig.KEY)
  private readonly notifyConfig: ConfigType<typeof NotifcationConfig>

  public async sendNotifyNewSubscriber(subscriber: ISubscriber) {
    await this.mailerService.sendMail({
      from: this.notifyConfig.mail.from,
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: `${subscriber.firstname} ${subscriber.lastname}`,
        email: `${subscriber.email}`
      }
    })
  }
}