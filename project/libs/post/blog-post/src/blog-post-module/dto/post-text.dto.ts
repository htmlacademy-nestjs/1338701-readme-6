import { IsNotEmpty, IsString } from 'class-validator'

export class PostTextDto {
  @IsNotEmpty()
  @IsString()
  announcement: string

  @IsNotEmpty()
  @IsString()
  content: string
}
