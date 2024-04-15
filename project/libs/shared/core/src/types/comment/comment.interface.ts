import { IPost, IUser } from '@project/shared/core'

export interface IComment {
  id?: string
  content: string
  postId: IPost['id']
  authorId: IUser['_id']
  createdAt: Date
  updatedAt: Date
}
