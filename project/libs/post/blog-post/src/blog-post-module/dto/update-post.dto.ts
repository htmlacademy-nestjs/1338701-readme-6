import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { PostType } from '@project/shared/core'
import { Type } from 'class-transformer'
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Validate,
  ValidateNested
} from 'class-validator'
import { PostLinkDto } from 'libs/post/blog-post/src/blog-post-module/dto/post-link.dto'
import { PostPhotoDto } from 'libs/post/blog-post/src/blog-post-module/dto/post-photo.dto'
import { PostQouteDto } from 'libs/post/blog-post/src/blog-post-module/dto/post-qoute.dto'
import { PostTextDto } from 'libs/post/blog-post/src/blog-post-module/dto/post-text.dto'
import { PostVideoDto } from 'libs/post/blog-post/src/blog-post-module/dto/post-video.dto'
import { IsValidPostProps } from 'libs/post/blog-post/src/blog-post-module/validators/is-valid-post-props'

export class UpdatePostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'String'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string

  @ApiProperty({
    description: 'Post Type',
    example: 'VIDEO',
    enum: PostType
  })
  @IsEnum(PostType)
  @IsNotEmpty()
  @IsOptional()
  type?: PostType

  @ApiProperty({
    description: 'ID author',
    example: 'String',
    enum: PostType
  })
  @IsString()
  @IsMongoId()
  @IsOptional()
  public authorId?: string

  @ApiProperty({
    description: 'Post tags',
    example: []
  })
  @IsUUID('all', { each: true })
  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  public tags?: string[]

  @IsObject()
  @IsNotEmpty()
  @IsOptional()
  postLink?: PostLinkDto

  @IsObject()
  @IsNotEmpty()
  @IsOptional()
  postPhoto?: PostPhotoDto

  @IsObject()
  @IsNotEmpty()
  @IsOptional()
  postQuote?: PostQouteDto

  @Validate(IsValidPostProps)
  @ValidateNested()
  @Type(() => PostTextDto)
  @IsOptional()
  postText?: PostTextDto

  @ApiPropertyOptional({
    description: 'Properties of post of type video',
    example: { urlYoutube: 'https://youtu.be/lwYWMHVwYrs?si=2YnJzt-m7xxa0MTZ' }
  })
  @Validate(IsValidPostProps)
  @ValidateNested()
  @Type(() => PostVideoDto)
  @IsOptional()
  postVideo: PostVideoDto
}
