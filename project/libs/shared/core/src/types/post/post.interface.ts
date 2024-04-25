import { IComment } from 'libs/shared/core/src/types/comment/comment.interface'
import { IPostLink } from 'libs/shared/core/src/types/post/post-link.interface'
import { IPostPhoto } from 'libs/shared/core/src/types/post/post-photo.interface'
import { IPostQuote } from 'libs/shared/core/src/types/post/post-quote.interface'
import { PostStatus } from 'libs/shared/core/src/types/post/post-status.enum'
import { IPostText } from 'libs/shared/core/src/types/post/post-text.interface'
import { PostType } from 'libs/shared/core/src/types/post/post-type.enum'
import { IPostVideo } from 'libs/shared/core/src/types/post/post-video.interface'
import { ITag } from 'libs/shared/core/src/types/tag/tag.interface'

export interface IPost {
  id?: string
  type: PostType
  title: string
  authorId: string
  likes: string[]
  tags: ITag[]
  comments: IComment[]
  status: PostStatus
  sourceId?: IPost['id']
  postVideo?: IPostVideo
  postLink?: IPostLink
  postQuote?: IPostQuote
  postPhoto?: IPostPhoto
  postText?: IPostText
  createdAt?: Date
  updatedAt?: Date
  publishedAt?: Date
}
