import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { ISubscriber } from '@project/shared/core'

@Schema({
  collection: 'email-subscribers',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
export class EmailSubscriberModel extends Document implements ISubscriber {
  @Prop({
    required: true
  })
  public email: string

  @Prop({
    required: true
  })
  public username: string
}

export const EmailSubscriberSchema = SchemaFactory.createForClass(EmailSubscriberModel)
