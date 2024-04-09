import { ApiProperty } from '@nestjs/swagger'
import { IComment, ITag, IUser, PostType } from '@project/shared/core'
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
  @Expose()
  public tags: ITag[]

  @ApiProperty({
    description: 'Post Author ID',
    example: '507f1f77bcf86cd799432323'
  })
  @Expose()
  public authorId: IUser['_id']

  @ApiProperty({
    description: 'List of IDs who liked it'
  })
  @Expose()
  public likes: IUser['_id'][]

  @ApiProperty({
    description: 'Post comments'
  })
  @Expose()
  public comment: IComment[]

  @ApiProperty({
    description: 'Is the post a draft?',
    example: false
  })
  @Expose()
  public isDraft: boolean

  @ApiProperty({
    description: 'Is the post a repost?',
    example: false
  })
  @Expose()
  public isRepost: boolean

  @ApiProperty({
    description: 'Post publication date',
    example: '2024-03-31 19:58:37'
  })
  @Expose()
  public publishedAt: string

  @ApiProperty({
    description: 'Post create date',
    example: '2024-03-31 19:58:37'
  })
  @Expose()
  public createdAt: string

  @ApiProperty({
    description: 'Post update date',
    example: '2024-03-31 19:58:37'
  })
  @Expose()
  public updatedAt: string
}
