import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IPostLink, IPostPhoto, IPostQuote, IPostText, IPostVideo, ITag, IUser, PostType } from '@project/shared/core'

export class CreatePostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'String'
  })
  title: string

  @ApiProperty({
    description: 'Post Type',
    example: 'String',
    enum: PostType
  })
  type: PostType

  @ApiProperty({
    description: 'Post tags',
    example: ['String', 'String']
  })
  tags: ITag['id'][]

  @ApiPropertyOptional({
    description: 'Properties of post of type link',
    example: { url: 'String', description: 'String' }
  })
  postLink?: IPostLink

  @ApiPropertyOptional({
    description: 'Properties of post of type photo',
    example: { photoId: 'String' }
  })
  postPhoto?: IPostPhoto

  @ApiPropertyOptional({
    description: 'Properties of post of type quote',
    example: { quoteContent: 'String' }
  })
  postQuote?: IPostQuote

  @ApiPropertyOptional({
    description: 'Properties of post of type text',
    example: { announcement: 'String', content: 'String' }
  })
  postText?: IPostText

  @ApiPropertyOptional({
    description: 'Properties of post of type video',
    example: { urlYoutube: 'String' }
  })
  postVideo?: IPostVideo
}
