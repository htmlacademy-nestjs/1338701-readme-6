import { Injectable } from '@nestjs/common'
import { IEntityFactory, ISubscriber } from '@project/shared/core'

import { EmailSubscriberEntity } from './email-subscriber.entity'

@Injectable()
export class EmailSubscriberFactory implements IEntityFactory<EmailSubscriberEntity> {
  public create(entityPlainData: ISubscriber): EmailSubscriberEntity {
    return new EmailSubscriberEntity(entityPlainData)
  }
}
