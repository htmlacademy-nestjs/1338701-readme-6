import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class PostLinkRdo {
  @ApiProperty({
    description: 'URL of the YouTube video',
    example: 'https://www.youtube.com/watch?v=VIDEO_ID'
  })
  @Expose()
  urlYoutube: string
}
