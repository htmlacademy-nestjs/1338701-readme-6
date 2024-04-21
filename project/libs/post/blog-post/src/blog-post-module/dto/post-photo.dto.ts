import { IsNotEmpty, IsString } from 'class-validator'

export class PostPhotoDto {
  @IsNotEmpty()
  @IsString()
  photoId: string
}
