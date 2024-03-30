import { IPost } from 'libs/shared/core/src/types/post/post.interface'

export interface IPostQuote extends IPost {
  quoteContent: string
}
