import { IsNotEmpty, IsString, Length } from 'class-validator'
import { validationRule } from 'libs/post/blog-post/src/blog-post-module/blog-post.constant'

export class PostTextDto {
  @IsNotEmpty()
  @IsString()
  @Length(validationRule.postText.announcement.minLength, validationRule.postText.announcement.maxLength)
  announcement: string

  @IsNotEmpty()
  @IsString()
  @Length(validationRule.postText.content.minLength, validationRule.postText.content.maxLength)
  content: string
}
