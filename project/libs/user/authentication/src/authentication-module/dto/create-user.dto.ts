import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({
    description: 'User email, uniq',
    example: 'exemple@domain.net'
  })
  public email: string

  @ApiProperty({
    description: 'User nickname',
    example: 'Denis Gromov'
  })
  public username: string

  @ApiProperty({
    description: 'Password at account',
    example: 'Qwerty123!'
  })
  public password: string
}
