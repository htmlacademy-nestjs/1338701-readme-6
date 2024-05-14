import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Length, Matches } from 'class-validator'
import { validationRule } from 'libs/post/blog-tag/src/blog-tag-module/blog-tag.constant'

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
