import { IPost, IUser } from '@project/shared/core'

export interface IComment {
  id: string
  text: string
  postId: IPost['id']
  author: IUser['_id']
}
