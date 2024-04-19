import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IPostLink, IPostPhoto, IPostQuote, IPostText, IPostVideo, ITag, PostType } from '@project/shared/core'
import { IsEnum, IsMongoId, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator'

export class CreatePostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'String'
  })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({
    description: 'Post Type',
    example: 'String',
    enum: PostType
  })
  @IsEnum(PostType)
  @IsNotEmpty()
  type: PostType

  @IsString()
  @IsMongoId()
  public authorId: string

  @ApiPropertyOptional({
    description: 'Properties of post of type link',
    example: { url: 'String', description: 'String' }
  })
  @IsObject()
  @IsNotEmpty()
  @IsOptional()
  postLink?: IPostLink

  @ApiPropertyOptional({
    description: 'Properties of post of type photo',
    example: { photoId: 'String' }
  })
  @IsObject()
  @IsNotEmpty()
  @IsOptional()
  postPhoto?: IPostPhoto

  @ApiPropertyOptional({
    description: 'Properties of post of type quote',
    example: { quoteContent: 'String' }
  })
  @IsObject()
  @IsNotEmpty()
  @IsOptional()
  postQuote?: IPostQuote

  @ApiPropertyOptional({
    description: 'Properties of post of type text',
    example: { announcement: 'String', content: 'String' }
  })
  @IsObject()
  @IsNotEmpty()
  @IsOptional()
  postText?: IPostText

  @ApiPropertyOptional({
    description: 'Properties of post of type video',
    example: { urlYoutube: 'String' }
  })
  @IsObject()
  @IsNotEmpty()
  @IsOptional()
  postVideo?: IPostVideo
}
