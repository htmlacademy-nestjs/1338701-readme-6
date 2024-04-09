import { IComment } from 'libs/shared/core/src/types/comment/comment.interface'
import { IPostLink } from 'libs/shared/core/src/types/post/post-link.interface'
import { IPostPhoto } from 'libs/shared/core/src/types/post/post-photo.interface'
import { IPostQuote } from 'libs/shared/core/src/types/post/post-quote.interface'
import { IPostText } from 'libs/shared/core/src/types/post/post-text.interface'
import { PostType } from 'libs/shared/core/src/types/post/post-type.enum'
import { IPostVideo } from 'libs/shared/core/src/types/post/post-video.interface'
import { ITag } from 'libs/shared/core/src/types/tag/tag.interface'
import { IUser } from 'libs/shared/core/src/types/user/user.interface'

export interface IPost {
  id: string | null
  title: string
  type: PostType
  tags: ITag['id'][]
  authorId: IUser['_id']
  likes: IUser['_id'][]
  comments: IComment['id'][]
  isDraft: boolean
  isRepost: boolean
  sourceAuthorId?: IUser['_id']
  sourceId?: IPost['id']
  postVideo?: IPostVideo
  postLink?: IPostLink
  postQuote?: IPostQuote
  postPhoto?: IPostPhoto
  postText?: IPostText
  publishedAt: string
  createdAt: string
  updatedAt: string
}
