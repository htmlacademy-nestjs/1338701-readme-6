import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { PostStatus, PostType } from '@project/shared/core'
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
import { PostQuoteDto } from 'libs/post/blog-post/src/blog-post-module/dto/post-quote.dto'
import { PostTextDto } from 'libs/post/blog-post/src/blog-post-module/dto/post-text.dto'
import { PostVideoDto } from 'libs/post/blog-post/src/blog-post-module/dto/post-video.dto'
import { IsValidPostProps } from 'libs/post/blog-post/src/blog-post-module/validators/is-valid-post-props'

export class LikePostDto {
  @ApiProperty({
    description: 'User ID',
    example: 'String'
  })
  @IsString()
  @IsNotEmpty()
  userId: string
}
