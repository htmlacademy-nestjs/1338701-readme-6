import { Entity, IPost, ITag, PostType, StorableEntity } from '@project/shared/core'

export abstract class BasePostEntity extends Entity implements StorableEntity<IPost> {
  public type: PostType
  public title: string
  public tags: ITag['id'][]
  public authorId: string
  public likes: string[]
  public comments: string[]
  public createdAt?: Date
  public updatedAt?: Date

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
    this.authorId = post.authorId
    this.likes = post.likes
    this.comments = post.comments
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
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
