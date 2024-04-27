import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'
import { validationRule } from 'libs/post/blog-post/src/blog-post-module/blog-post.constant'

export class PostLinkDto {
  @IsNotEmpty()
  @IsString()
  url: string

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(validationRule.postLink.description.maxLength)
  description: string
}
