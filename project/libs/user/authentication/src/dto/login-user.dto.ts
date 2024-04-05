import { ApiProperty } from '@nestjs/swagger'

export class LoginUserDto {
  @ApiProperty({
    description: 'User email for authorization',
    example: 'exemple@domain.net'
  })
  public email: string

  @ApiProperty({
    description: 'User password for authorization',
    example: 'exemple@domain.net'
  })
  public password: string
}
