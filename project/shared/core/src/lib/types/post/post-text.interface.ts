import { IPost } from 'shared/core/src/lib/types/post/post.interface'

export interface IPostText extends IPost {
  urlYoutube: string
  announcement: string
  textContent: string
}
