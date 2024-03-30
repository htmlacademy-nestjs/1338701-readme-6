import { IUser } from '@project/shared/core'
import { IComment } from 'shared/core/src/lib/types/comment/comment.interface';
import { PostType } from 'shared/core/src/lib/types/post/post-type.enum'

export interface IPost {
  id: string
  title: string
  type: PostType
  tags?: IPost[]
  authorId: IUser['id']
  likes: IUser['id'][]
  comments: IComment['id']
  isDraft: boolean
  isRepost: boolean
  sourceAuthorId?: IUser['id']
  sourceId?: IPost['id']
  createAt: Date
  updateAt: Date
}
