import { Expose } from 'class-transformer'

export class PostQuoteRdo {
  @Expose()
  quoteContent: string
}
