import { IsNotEmpty, IsString, Length } from 'class-validator'
import { validationRule } from 'libs/post/blog-post/src/blog-post-module/blog-post.constant'

export class PostQuoteDto {
  @IsNotEmpty()
  @IsString()
  @Length(validationRule.postQuote.quoteContent.minLength, validationRule.postQuote.quoteContent.maxLength)
  quoteContent: string

  @IsNotEmpty()
  @IsString()
  @Length(validationRule.postQuote.quoteAuthor.minLength, validationRule.postQuote.quoteAuthor.maxLength)
  quoteAuthor: string
}
