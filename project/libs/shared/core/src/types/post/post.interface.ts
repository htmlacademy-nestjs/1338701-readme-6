import { IComment } from 'libs/shared/core/src/types/comment/comment.interface';
import { PostType } from 'libs/shared/core/src/types/post/post-type.enum';
import { IUser } from 'libs/shared/core/src/types/user/user.interface';

export interface IPost {
  id?: string
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

}
