import { IPost } from 'shared/core/src/lib/types/post/post.interface'

export interface IPostPhoto extends IPost {
  imageId: string // TODO: Поменять на ID Image
}
