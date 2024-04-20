import { Expose } from 'class-transformer'

export class CommentRdo {
  @Expose()
  public postId: string

  @Expose()
  public content: string

  @Expose()
  public authorId: string

  @Expose()
  public createdAt: Date

  public updatedAt: Date
}
