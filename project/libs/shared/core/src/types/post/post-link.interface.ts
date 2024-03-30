import { IPost } from 'libs/shared/core/src/types/post/post.interface'

export interface IPostLink extends IPost {
  url: string
  description?: string
}
