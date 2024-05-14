import { ApiProperty } from '@nestjs/swagger'
import { validationRule } from 'apps/api-gateway/src/app/tag.constant'
import { IsNotEmpty, Length, Matches } from 'class-validator'

export class CreateTagDto {
  @ApiProperty({
    description: 'Uniq category name',
    example: 'String'
  })
  @IsNotEmpty({ message: 'Name must not be empty' })
  @Length(validationRule.tagName.minLength, validationRule.tagName.maxLength, {
    message: validationRule.tagName.message
  })
  @Matches(validationRule.tagName.format, { message: validationRule.tagName.message })
  public name: string
}
