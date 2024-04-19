import { ApiProperty } from '@nestjs/swagger'

export class UpdateTagDto {
  @ApiProperty({
    description: 'Uniq category name',
    example: 'String'
  })
  public name: string
}
