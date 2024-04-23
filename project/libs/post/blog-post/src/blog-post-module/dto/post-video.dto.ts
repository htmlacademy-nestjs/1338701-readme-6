import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator'

export class PostVideoDto {
  @ApiProperty({
    description: 'URL of the YouTube video',
    example: 'https://www.youtube.com/watch?v=VIDEO_ID'
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/, {
    message: 'Invalid YouTube URL format'
  })
  urlYoutube: string
}
