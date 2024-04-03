import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IPostLink, IPostPhoto, IPostQuote, IPostText, IPostVideo, ITag, IUser, PostType } from '@project/shared/core'

export class CreatePostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'Some Post'
  })
  title: string

  @ApiProperty({
    description: 'Post Type',
    example: 'video',
    enum: PostType
  })
  type: PostType

  @ApiProperty({
    description: 'Post tags',
    example: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439022']
  })
  tags: ITag['id'][]

  @ApiPropertyOptional({
    description: 'Properties of post of type link',
    example: { url: 'https://example.com', description: 'This is a link to an example website' }
  })
  postLink?: IPostLink

  @ApiPropertyOptional({
    description: 'Properties of post of type photo',
    example: { photoId: 'photo_id_example' }
  })
  postPhoto?: IPostPhoto

  @ApiPropertyOptional({
    description: 'Properties of post of type quote',
    example: { quoteContent: 'This is a quote.' }
  })
  postQuote?: IPostQuote

  @ApiPropertyOptional({
    description: 'Properties of post of type text',
    example: { announcement: 'Announcement for the text post', content: 'Text content of the post' }
  })
  postText?: IPostText

  @ApiPropertyOptional({
    description: 'Properties of post of type video',
    example: { urlYoutube: 'https://www.youtube.com/watch?v=example_video_id' }
  })
  postVideo?: IPostVideo
}
