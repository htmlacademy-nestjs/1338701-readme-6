import { BlogCommentEntity, BlogCommentFactory } from '@project/blog-comment'
import { BlogTagEntity, BlogTagFactory } from '@project/blog-tag'
import { Entity, IPost, ITag, PostType, StorableEntity } from '@project/shared/core'

export abstract class BasePostEntity extends Entity implements StorableEntity<IPost> {
  public type: PostType
  public title: string
  public authorId: string
  public likes: string[]
  public comments: BlogCommentEntity[]
  public tags: BlogTagEntity[]
  public createdAt?: Date
  public updatedAt?: Date

  constructor(post?: IPost) {
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
    this.likes = []
    this.comments = []
    this.createdAt = post.createdAt
    this.updatedAt = post.updatedAt

    const blogCommentFactory = new BlogCommentFactory()
    for (const comment of post.comments) {
      const blogCommentEntity = blogCommentFactory.create(comment)
      this.comments.push(blogCommentEntity)
    }

    const blogTagFactory = new BlogTagFactory()
    for (const tag of post.tags) {
      const blogCategoryEntity = blogTagFactory.create(tag)
      this.tags.push(blogCategoryEntity)
    }
  }

  public toPOJO(): IPost {
    return {
      id: this.id,
      title: this.title,
      type: this.type,
      authorId: this.authorId,
      likes: this.likes,
      comments: this.comments,
      tags: this.tags,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
