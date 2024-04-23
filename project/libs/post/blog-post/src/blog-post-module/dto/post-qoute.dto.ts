import { IsNotEmpty, IsString } from 'class-validator'

export class PostQouteDto {
  @IsNotEmpty()
  @IsString()
  quoteContent: string
}
