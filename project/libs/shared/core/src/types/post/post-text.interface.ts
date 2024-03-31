import { IPost } from 'libs/shared/core/src/types/post/post.interface'

export interface IPostText extends IPost {
  announcement: string
  content: string
}
