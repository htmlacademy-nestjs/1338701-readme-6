import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class CommentRdo {
  @ApiProperty({
    description: 'Post ID',
    example: 'String'
  })
  @Expose()
  public postId: string

  @ApiProperty({
    description: 'Comment content',
    example: 'String'
  })
  @Expose()
  public content: string

  @ApiProperty({
    description: 'Author ID',
    example: 'String'
  })
  @Expose()
  public authorId: string

  @ApiProperty({
    description: 'Comment created date',
    example: '2024-03-31 19:58:37'
  })
  @Expose()
  public createdAt: Date

  @ApiProperty({
    description: 'Comment updated date',
    example: '2024-03-31 19:58:37'
  })
  public updatedAt: Date
}
