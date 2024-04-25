import { ApiProperty } from '@nestjs/swagger'

export class PostVideoRdo {
  @ApiProperty({
    description: 'URL of the YouTube video',
    example: 'https://www.youtube.com/watch?v=VIDEO_ID'
  })
  urlYoutube: string
}
