import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({
    description: 'User email, uniq',
    example: 'string'
  })
  public email: string

  @ApiProperty({
    description: 'User nickname',
    example: 'string'
  })
  public username: string

  @ApiProperty({
    description: 'Password at account',
    example: 'string'
  })
  public password: string
}
