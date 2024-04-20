import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IPostLink, IPostPhoto, IPostQuote, IPostText, IPostVideo, ITag, PostType } from '@project/shared/core'
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID
} from 'class-validator'

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

  @IsUUID('all', { each: true })
  @IsArray()
  @ArrayNotEmpty()
  public tags: string[]

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
