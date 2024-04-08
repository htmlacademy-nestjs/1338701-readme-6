import { ApiProperty } from '@nestjs/swagger'

export class LoginUserDto {
  @ApiProperty({
    description: 'User email for authorization',
    example: 'string'
  })
  public email: string

  @ApiProperty({
    description: 'User password for authorization',
    example: 'string'
  })
  public password: string
}
