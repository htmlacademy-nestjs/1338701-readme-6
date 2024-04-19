import { ApiProperty } from '@nestjs/swagger'

export class CreateTagDto {
  @ApiProperty({
    description: 'Uniq category name',
    example: 'String'
  })
  public name: string
}
