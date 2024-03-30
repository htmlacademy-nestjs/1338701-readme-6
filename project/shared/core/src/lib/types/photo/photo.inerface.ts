import { PhotoFormat } from 'shared/core/src/lib/types/photo/photo-format.enum';

export interface IPhoto {
  id: string
  size: number
  format: PhotoFormat
  isAvatar?: boolean
  createAt: Date
  updateAt: Date
}
