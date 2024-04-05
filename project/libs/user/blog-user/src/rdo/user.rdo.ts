import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class UserRdo {
  @ApiProperty({
    description: 'User ID',
    example: '507f1f77bcf86cd799439011'
  })
  @Expose()
  public id: string

  @ApiProperty({
    description: 'User avatar ID',
    example: '507f1f77bcf86cd799439011'
  })
  @Expose()
  public avatarId: string

  @ApiProperty({
    description: 'User email',
    example: 'mail@domain.net'
  })
  @Expose()
  public email: string

  @ApiProperty({
    description: 'User nickname',
    example: 'Denis Gromov'
  })
  @Expose()
  public nickname: string

  @ApiProperty({
    description: 'User create date',
    example: '2024-03-31 19:58:37'
  })
  @Expose()
  public createAt: string
}
