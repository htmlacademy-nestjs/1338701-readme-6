import { IPost } from 'shared/core/src/lib/types/post/post.interface'

export interface IPostLink extends IPost {
  url: string
  description?: string
}
