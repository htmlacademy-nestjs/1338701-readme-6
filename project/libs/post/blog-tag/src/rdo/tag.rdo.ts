import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class TagRdo {
  @ApiProperty({
    description: 'Tag ID',
    example: 'String'
  })
  @Expose()
  @Expose()
  public id: string

  @ApiProperty({
    description: 'Tag name',
    example: 'String'
  })
  @Expose()
  @Expose()
  public name: string
}
