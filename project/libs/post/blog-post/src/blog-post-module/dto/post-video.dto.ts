import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Matches } from 'class-validator'
import { validationRule } from 'libs/post/blog-post/src/blog-post-module/blog-post.constant'

export class PostVideoDto {
  @ApiProperty({
    description: 'URL of the YouTube video',
    example: 'https://www.youtube.com/watch?v=VIDEO_ID'
  })
  @IsNotEmpty()
  @IsString()
  @Matches(validationRule.postVideo.urlYoutube.formatLink, {
    message: validationRule.postVideo.urlYoutube.message
  })
  urlYoutube: string
}
