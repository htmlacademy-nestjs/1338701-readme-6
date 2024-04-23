import { ApiProperty } from '@nestjs/swagger'

export class UpdateCommentDto {
  @ApiProperty({
    description: 'Uniq category name',
    example: 'String'
  })
  public name: string
}
