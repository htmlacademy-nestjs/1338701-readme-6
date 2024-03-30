import { IPost } from 'libs/shared/core/src/types/post/post.interface'

export interface IPostText extends IPost {
  urlYoutube: string
  announcement: string
  textContent: string
}
