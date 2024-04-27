import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length } from 'class-validator'
import {
  ApiDescription,
  AuthenticationValidateMessage,
  ValidationRule
} from 'libs/user/authentication/src/authentication-module/authentication.constant'

export class CreateUserDto {
  @ApiProperty({
    description: ApiDescription.Email,
    example: 'String'
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string

  @ApiProperty({
    description: ApiDescription.Username,
    example: 'String'
  })
  @Length(ValidationRule.MinUsernameLength, ValidationRule.MaxUsernameLength)
  @IsString()
  public username: string

  @ApiProperty({
    description: ApiDescription.Password,
    example: 'String'
  })
  @Length(ValidationRule.MinPasswordLength, ValidationRule.MaxPasswordLength)
  @IsString()
  public password: string
}
