import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class PostLinkDto {
  @IsNotEmpty()
  @IsString()
  url: string

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string
}
