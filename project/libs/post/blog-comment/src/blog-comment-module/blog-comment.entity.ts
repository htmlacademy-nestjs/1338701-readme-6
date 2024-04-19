import { Entity, IComment, ITag, StorableEntity } from '@project/shared/core'

export class BlogCommentEntity extends Entity implements StorableEntity<IComment> {
  public content: string
  public postId: string
  public authorId: string
  public createdAt?: Date
  public updatedAt?: Date

  constructor(comment?: IComment) {
    super()
    this.populate(comment)
  }

  public populate(comment?: IComment) {
    if (!comment) {
      return
    }

    this.id = comment.id
    this.content = comment.content
    this.postId = comment.postId
    this.authorId = comment.authorId
    this.createdAt = comment.createdAt
    this.updatedAt = comment.updatedAt
  }

  toPOJO(): IComment {
    return {
      id: this.id,
      content: this.content,
      postId: this.postId,
      authorId: this.authorId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
