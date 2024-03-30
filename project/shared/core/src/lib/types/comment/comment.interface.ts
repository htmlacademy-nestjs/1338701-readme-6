import { IUser } from '@project/shared/core';
import { IPost } from 'shared/core/src/lib/types/post/post.interface';

export interface IComment {
  id: string
  text: string
  postId: IPost['id']
  author: IUser['id']
  createAt: Date
  updateAt: Date
}
