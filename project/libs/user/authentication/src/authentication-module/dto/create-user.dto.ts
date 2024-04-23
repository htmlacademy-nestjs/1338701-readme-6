import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'
import { AuthenticationValidateMessage } from 'libs/user/authentication/src/authentication-module/authentication.constant'

export class CreateUserDto {
  @ApiProperty({
    description: 'User email, uniq',
    example: 'String'
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string

  @ApiProperty({
    description: 'User nickname',
    example: 'string'
  })
  @IsString()
  public username: string

  @ApiProperty({
    description: 'Password at account',
    example: 'string'
  })
  @IsString()
  public password: string
}
