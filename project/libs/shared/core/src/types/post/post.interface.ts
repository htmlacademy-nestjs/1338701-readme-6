import { IComment } from 'libs/shared/core/src/types/comment/comment.interface'
import { PostType } from 'libs/shared/core/src/types/post/post-type.enum'
import { ITag } from 'libs/shared/core/src/types/tag/tag.interface'
import { IUser } from 'libs/shared/core/src/types/user/user.interface'

export interface IPost {
  id: string | null
  title: string
  type: PostType
  tags: ITag[] | null
  authorId: IUser['id']
  likes: IUser['id'][]
  comments: IComment['id'][]
  isDraft: boolean
  isRepost: boolean
  sourceAuthorId?: IUser['id']
  sourceId?: IPost['id']
  createdAt: string
  updatedAt: string
}
