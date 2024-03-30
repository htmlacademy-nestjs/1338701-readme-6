import { IPost } from 'shared/core/src/lib/types/post/post.interface'

export interface IPostQuote extends IPost {
  quoteContent: string
}
