import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'
import { AuthenticationValidateMessage } from 'libs/user/authentication/src/authentication-module/authentication.constant'

export class LoginUserDto {
  @ApiProperty({
    description: 'User email for authorization',
    example: 'String'
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string

  @ApiProperty({
    description: 'User password for authorization',
    example: 'String'
  })
  @IsString()
  public password: string
}
