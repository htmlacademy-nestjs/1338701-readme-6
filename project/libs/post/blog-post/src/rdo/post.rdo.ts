import { ApiProperty } from '@nestjs/swagger'
import {
  IComment,
  IPostLink,
  IPostPhoto,
  IPostQuote,
  IPostText,
  IPostVideo,
  ITag,
  IUser,
  PostType
} from '@project/shared/core'
import { Expose } from 'class-transformer'

export class PostRdo {
  @ApiProperty({
    description: 'Post ID',
    example: '507f1f77bcf86cd799439011'
  })
  @Expose()
  public id: string

  @ApiProperty({
    description: 'Post title',
    example: 'Some Post'
  })
  @Expose()
  public title: string

  @ApiProperty({
    description: 'Post Type',
    example: 'video'
  })
  @Expose()
  public type: PostType

  @ApiProperty({
    description: 'Post tags'
  })
  @ApiProperty({
    description: 'Post Author ID',
    example: '507f1f77bcf86cd799432323'
  })
  @Expose()
  public authorId: string

  @ApiProperty({
    description: 'List of IDs who liked it',
    example: ['String', 'String']
  })
  @Expose()
  public likes: string[]

  @ApiProperty({
    description: 'Post comments',
    example: ['String', 'String']
  })
  @Expose()
  public comments: string[]

  //TODO: Заполнить документацию по объектам
  @Expose()
  postVideo?: IPostVideo

  @Expose()
  postLink?: IPostLink

  @Expose()
  postQuote?: IPostQuote

  @Expose()
  postPhoto?: IPostPhoto

  @Expose()
  postText?: IPostText

  @ApiProperty({
    description: 'Post create date',
    example: '2024-03-31 19:58:37'
  })
  @Expose()
  public createdAt: Date

  @ApiProperty({
    description: 'Post update date',
    example: '2024-03-31 19:58:37'
  })
  @Expose()
  public updatedAt: Date
}
