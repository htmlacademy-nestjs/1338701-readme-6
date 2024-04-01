import {
  Entity,
  IComment,
  IPost,
  IPostLink,
  IPostPhoto,
  IPostQuote,
  IPostText,
  IPostVideo,
  ITag,
  IUser,
  PostType,
  StorableEntity
} from '@project/shared/core'

export class BlogPostEntity extends Entity implements StorableEntity<IPost> {
  public title: string
  public type: PostType
  public tags: ITag['id'][]
  public authorId: string | null
  public likes: IUser['id'][]
  public comments: IComment['id'][]
  public isDraft: boolean
  public isRepost: boolean
  public sourceAuthorId?: IUser['id']
  public sourceId?: IPost['id']
  postVideo?: IPostVideo
  postLink?: IPostLink
  postQuote?: IPostQuote
  postPhoto?: IPostPhoto
  postText?: IPostText
  public publishedAt: string
  public createdAt: string
  public updatedAt: string

  constructor(post: IPost) {
    super()
    this.populate(post)
  }

  public populate(post?: IPost) {
    if (!post) {
      return
    }

    this.id = post.id
    this.type = post.type
    this.title = post.title
    this.tags = post.tags
    this.authorId = post.authorId
    this.likes = post.likes
    this.comments = post.comments
    this.isDraft = post.isDraft
    this.isRepost = post.isRepost
    this.sourceAuthorId = post.sourceAuthorId
    this.sourceId = post.sourceId
    this.publishedAt = post.publishedAt
    this.createdAt = post.createdAt
    this.updatedAt = post.updatedAt
  }

  toPOJO(): IPost {
    return {
      id: this.id,
      title: this.title,
      type: this.type,
      tags: this.tags,
      authorId: this.authorId,
      likes: this.likes,
      comments: this.comments,
      isDraft: this.isDraft,
      isRepost: this.isRepost,
      sourceAuthorId: this.sourceAuthorId,
      postLink: this.postLink,
      postVideo: this.postVideo,
      postQuote: this.postQuote,
      postPhoto: this.postPhoto,
      postText: this.postText,
      sourceId: this.sourceId,
      publishedAt: this.publishedAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }

  public async setPostText(dataPostText?: IPostText): Promise<BlogPostEntity> {
    this.postText = dataPostText
    return this
  }

  public async setPostVideo(dataPostVideo?: IPostVideo): Promise<BlogPostEntity> {
    this.postVideo = dataPostVideo
    return this
  }

  public async setPostLink(dataPostLink?: IPostLink): Promise<BlogPostEntity> {
    this.postLink = dataPostLink
    return this
  }

  public async setPostQuote(dataPostQuote?: IPostQuote): Promise<BlogPostEntity> {
    this.postQuote = dataPostQuote
    return this
  }

  public async setPostPhoto(dataPostPhoto?: IPostPhoto): Promise<BlogPostEntity> {
    this.postPhoto = dataPostPhoto
    return this
  }
}
