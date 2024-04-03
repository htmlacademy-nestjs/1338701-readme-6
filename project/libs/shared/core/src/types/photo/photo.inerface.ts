import {
  PhotoFormat
} from 'libs/shared/core/src/types/photo/photo-format.enum';

export interface IPhoto {
  id?: string
  size: number
  format: PhotoFormat
  isAvatar?: boolean
}
