import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'
import {
  ApiDescription,
  ValidationRule
} from 'libs/user/authentication/src/authentication-module/authentication.constant'

export class ChagePasswordDto {
  @ApiProperty({
    description: ApiDescription.Password,
    example: 'String'
  })
  @Length(ValidationRule.MinPasswordLength, ValidationRule.MaxPasswordLength)
  @IsString()
  public currentPassword: string

  @ApiProperty({
    description: ApiDescription.NewPassword,
    example: 'String'
  })
  @Length(ValidationRule.MinPasswordLength, ValidationRule.MaxPasswordLength)
  @IsString()
  public newPassword: string
}
