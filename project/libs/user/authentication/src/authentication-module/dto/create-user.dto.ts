import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length } from 'class-validator'
import {
  ApiDescription,
  AuthenticationValidateMessage,
  ValidationRule
} from 'libs/user/authentication/src/authentication-module/authentication.constant'

export class CreateUserDto {
  @ApiProperty({
    description: ApiDescription.EMAIL,
    example: 'String'
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string

  @ApiProperty({
    description: ApiDescription.USERNAME,
    example: 'String'
  })
  @Length(ValidationRule.MIN_USERNAME_LENGTH, ValidationRule.MAX_USERNAME_LENGTH)
  @IsString()
  public username: string

  @ApiProperty({
    description: ApiDescription.PASSWORD,
    example: 'String'
  })
  @Length(ValidationRule.MIN_PASSWORD_LENGTH, ValidationRule.MAX_PASSWORD_LENGTH)
  @IsString()
  public password: string
}
