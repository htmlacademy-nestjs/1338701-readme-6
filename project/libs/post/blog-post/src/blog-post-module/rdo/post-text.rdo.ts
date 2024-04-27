import { Expose } from 'class-transformer'

export class PostTextRdo {
  @Expose()
  announcement: string

  @Expose()
  content: string
}
