import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class PostTextDto {
  @ApiProperty({
    description: 'Announcement',
    example: 'String'
  })
  @IsNotEmpty()
  @IsString()
  announcement: string

  @ApiProperty({
    description: 'Announcement',
    example: 'String'
  })
  @IsNotEmpty()
  @IsString()
  content: string
}
