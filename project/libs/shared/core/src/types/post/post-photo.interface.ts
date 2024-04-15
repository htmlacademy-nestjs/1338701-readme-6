import { IPhoto } from 'libs/shared/core/src/types/photo/photo.inerface'
import { IPost } from 'libs/shared/core/src/types/post/post.interface'

export interface IPostPhoto {
  id?: string
  photoId: IPhoto['id']
}
