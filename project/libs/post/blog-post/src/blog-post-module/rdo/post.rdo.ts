import { ApiProperty } from '@nestjs/swagger'
import { IPostLink, IPostPhoto, IPostQuote, IPostText, PostStatus, PostType } from '@project/shared/core'
import { Expose } from 'class-transformer'
import { PostVideoRdo } from 'libs/post/blog-post/src/blog-post-module/rdo/post-video.rdo'

export class PostRdo {
  @ApiProperty({
    description: 'Post ID',
    example: 'String'
  })
  @Expose()
  public id: string

  @ApiProperty({
    description: 'Post title',
    example: 'String'
  })
  @Expose()
  public title: string

  @ApiProperty({
    description: 'Post Type',
    example: 'String'
  })
  @Expose()
  public type: PostType

  @ApiProperty({
    description: 'Post Status',
    example: 'String'
  })
  @Expose()
  public status: PostStatus

  @ApiProperty({
    description: 'Post tags'
  })
  @ApiProperty({
    description: 'Post Author ID',
    example: 'String'
  })
  @Expose()
  public authorId: string

  @ApiProperty({
    description: 'List of IDs who liked it',
    example: []
  })
  @Expose()
  public likes: string[]

  @ApiProperty({
    description: 'Post comments',
    example: []
  })
  @Expose()
  public comments: string[]

  @ApiProperty({
    description: 'Post tags',
    example: []
  })
  @Expose()
  public tags: string[]

  @ApiProperty({
    description: 'Post video'
  })
  @Expose()
  postVideo?: PostVideoRdo

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

  @ApiProperty({
    description: 'Post published date',
    example: '2024-03-31 19:58:37'
  })
  @Expose()
  public publishedAt: Date
}
