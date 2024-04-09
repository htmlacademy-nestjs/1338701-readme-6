import { IAuthUser } from '@project/shared/core'
import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({
  collection: 'users',
  timestamps: true
})
export class BlogUserModel extends Document implements IAuthUser {
  @Prop({
    required: true
  })
  username: string

  @Prop({
    required: true,
    unique: true
  })
  email: string

  @Prop()
  passwordHash: string

  @Prop()
  avatarId: string
}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel)
