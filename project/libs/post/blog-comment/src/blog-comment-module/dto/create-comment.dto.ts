import { ApiProperty } from '@nestjs/swagger'
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator'
import { BlogCommentValidateMessage } from 'libs/post/blog-comment/src/blog-comment-module/blog-comment.constant'

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment content',
    example: 'String'
  })
  @IsString()
  @IsNotEmpty({ message: BlogCommentValidateMessage.MessageIsEmpty })
  public content: string

  @ApiProperty({
    description: 'Author ID',
    example: 'String'
  })
  @IsString()
  @IsMongoId({ message: BlogCommentValidateMessage.InvalidID })
  public authorId: string
}
