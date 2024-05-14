import { ApiProperty } from '@nestjs/swagger'
import { IsMongoId, IsNotEmpty, IsString, Length } from 'class-validator'
import {
  BlogCommentValidateMessage,
  MAX_CONTENT_LENGTH,
  MIN_CONTENT_LENGTH
} from 'libs/post/blog-comment/src/blog-comment-module/blog-comment.constant'

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment content',
    example: 'String'
  })
  @IsString()
  @IsNotEmpty({ message: BlogCommentValidateMessage.MessageIsEmpty })
  @Length(MIN_CONTENT_LENGTH, MAX_CONTENT_LENGTH, { message: BlogCommentValidateMessage.ContentLengthError })
  public content: string

  @ApiProperty({
    description: 'Author ID',
    example: 'String'
  })
  @IsString()
  @IsMongoId({ message: BlogCommentValidateMessage.InvalidID })
  public authorId: string
}
