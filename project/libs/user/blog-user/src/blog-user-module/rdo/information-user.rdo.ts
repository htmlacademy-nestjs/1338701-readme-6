import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class InformationUserRdo {
  @ApiProperty({
    description: 'User ID',
    example: 'string'
  })
  @Expose()
  public _id: string

  @ApiProperty({
    description: 'User email',
    example: 'string'
  })
  @Expose()
  public email: string

  @ApiProperty({
    description: 'User username',
    example: 'string'
  })
  @Expose()
  public username: string
}
