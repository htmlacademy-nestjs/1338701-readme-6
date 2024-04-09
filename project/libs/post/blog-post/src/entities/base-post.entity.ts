import { Entity, IComment, IPost, ITag, IUser, PostType, StorableEntity } from '@project/shared/core'

export abstract class BasePostEntity extends Entity implements StorableEntity<IPost> {
  public title: string
  public type: PostType
  public tags: ITag['id'][]
  public authorId: string | null
  public likes: IUser['_id'][]
  public comments: IComment['id'][]
  public isDraft: boolean
  public isRepost: boolean
  public sourceAuthorId?: IUser['_id']
  public sourceId?: IPost['id']
  public publishedAt: string
  public createdAt: string
  public updatedAt: string

  constructor(post: IPost) {
    super()
    this.populate(post)
  }

  protected populate(post?: IPost) {
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

  public toPOJO(): IPost {
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
      sourceId: this.sourceId,
      publishedAt: this.publishedAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
