import { IPhoto } from 'shared/core/src/lib/types/photo/photo.inerface'
import { IPost } from 'shared/core/src/lib/types/post/post.interface'

export interface IPostPhoto extends IPost {
  photoId: IPhoto['id']
}
