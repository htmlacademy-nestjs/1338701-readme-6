import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class UserRdo {
  @ApiProperty({
    description: 'User ID',
    example: 'string'
  })
  @Expose()
  public _id: string

  @ApiProperty({
    description: 'User avatar ID',
    example: 'string'
  })
  @Expose()
  public avatarId?: string

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

  @ApiProperty({
    description: 'User create date',
    example: '2024-03-31 19:58:37'
  })
  @Expose()
  public createdAt: Date

  @ApiProperty({
    description: 'User update date',
    example: '2024-03-31 19:58:37'
  })
  @Expose()
  public updatedAt: Date
}
