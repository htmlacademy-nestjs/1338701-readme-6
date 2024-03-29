import { IUser } from '@project/shared/core'
import { PostType } from 'shared/core/src/lib/types/post/post-type.enum'

export interface IPost {
  id: string
  title: string
  type: PostType
  tags?: string[]
  authorId: IUser['id']
  likes: IUser['id'][]
  comments: string[] // TODO: Изменить на тип комментариев
  isDraft: boolean
  isRepost: boolean
  sourceAuthorId?: IUser['id']
  sourceId?: IPost['id']
  createAt: Date
  updateAt: Date
}
