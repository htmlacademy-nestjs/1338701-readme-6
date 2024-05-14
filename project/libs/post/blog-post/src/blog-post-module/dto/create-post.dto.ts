import { UsePipes } from '@nestjs/common'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { PostStatus, PostType } from '@project/shared/core'
import { Type } from 'class-transformer'
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Validate,
  ValidateNested
} from 'class-validator'
import { ApiPropertyDescription, validationRule } from 'libs/post/blog-post/src/blog-post-module/blog-post.constant'
import { PostLinkDto } from 'libs/post/blog-post/src/blog-post-module/dto/post-link.dto'
import { PostPhotoDto } from 'libs/post/blog-post/src/blog-post-module/dto/post-photo.dto'
import { PostQuoteDto } from 'libs/post/blog-post/src/blog-post-module/dto/post-quote.dto'
import { PostTextDto } from 'libs/post/blog-post/src/blog-post-module/dto/post-text.dto'
import { PostVideoDto } from 'libs/post/blog-post/src/blog-post-module/dto/post-video.dto'
import { RemoveDuplicateTagsPipe } from 'libs/post/blog-post/src/blog-post-module/pipes/remove-duplicate-tags.pipe'
import { IsValidPostContent } from 'libs/post/blog-post/src/blog-post-module/validators/is-valid-post-content'
import { IsValidPostProps } from 'libs/post/blog-post/src/blog-post-module/validators/is-valid-post-props'
import { TagArrayValidator } from 'libs/post/blog-post/src/blog-post-module/validators/tag-array-validator'

@UsePipes(RemoveDuplicateTagsPipe)
export class CreatePostDto {
  @ApiProperty({
    description: ApiPropertyDescription.Title,
    example: 'String'
  })
  @Length(validationRule.title.minLength, validationRule.title.maxLength)
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({
    description: ApiPropertyDescription.Type,
    example: 'VIDEO',
    enum: PostType
  })
  @Validate(IsValidPostContent)
  @IsEnum(PostType)
  @IsNotEmpty()
  type: PostType

  @ApiProperty({
    description: ApiPropertyDescription.AuthorId,
    example: 'String'
  })
  @IsString()
  @IsMongoId()
  public authorId: string

  @ApiProperty({
    description: 'Status',
    example: 'DRAFT',
    enum: PostStatus
  })
  @IsEnum(PostStatus)
  @IsNotEmpty()
  @IsOptional()
  public status: PostStatus

  @ApiProperty({
    description: ApiPropertyDescription.Tag,
    example: []
  })
  @IsUUID('all', { each: true })
  @IsArray()
  @IsOptional()
  @Validate(TagArrayValidator)
  public tags: string[]

  @Validate(IsValidPostProps)
  @ValidateNested()
  @Type(() => PostLinkDto)
  @IsOptional()
  postLink?: PostLinkDto

  @Validate(IsValidPostProps)
  @ValidateNested()
  @Type(() => PostPhotoDto)
  @IsOptional()
  postPhoto?: PostPhotoDto

  @Validate(IsValidPostProps)
  @ValidateNested()
  @Type(() => PostQuoteDto)
  @IsOptional()
  postQuote?: PostQuoteDto

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
