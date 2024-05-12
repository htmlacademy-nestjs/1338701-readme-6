import { BlogCommentEntity, BlogCommentFactory } from '@project/blog-comment'
import { BlogTagEntity, BlogTagFactory } from '@project/blog-tag'
import { Entity, IPost, PostStatus, PostType, StorableEntity } from '@project/shared/core'
import { CreatePostDto } from 'libs/post/blog-post/src/blog-post-module/dto/create-post.dto'

export class BasePostEntity extends Entity implements StorableEntity<IPost> {
  public type: PostType
  public title: string
  public authorId: string
  public originalAuthorId?: string
  public originalPostId?: string
  public isRepost?: boolean
  public repostedBy: string[]
  public likes: string[]
  public likesCount: number
  public commentsCount: number
  public comments: BlogCommentEntity[]
  public tags: BlogTagEntity[]
  public status: PostStatus
  public createdAt?: Date
  public updatedAt?: Date
  public publishedAt?: Date

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
    this.likes = post.likes
    this.originalAuthorId = post.originalAuthorId ? post.originalPostId : undefined
    this.originalPostId = post.originalPostId ? post.originalAuthorId : undefined
    this.isRepost = post.isRepost ? post.isRepost : undefined
    this.repostedBy = post.repostedBy
    this.likesCount = post.likesCount
    this.commentsCount = post.commentsCount
    this.tags = []
    this.comments = []
    this.status = post.status
    this.publishedAt = post.publishedAt
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
      originalAuthorId: this.originalAuthorId,
      originalPostId: this.originalPostId,
      isRepost: this.isRepost,
      repostedBy: this.repostedBy,
      commentsCount: this.commentsCount,
      likesCount: this.likesCount,
      comments: this.comments.map((commentEntity) => commentEntity.toPOJO()),
      tags: this.tags.map((tagEntity) => tagEntity.toPOJO()),
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      publishedAt: this.publishedAt
    }
  }

  static fromDto(dto: CreatePostDto, tags: BlogTagEntity[]): BasePostEntity {
    const entity = new BasePostEntity()
    entity.tags = tags
    entity.type = dto.type
    entity.title = dto.title
    entity.status = dto.status
    entity.authorId = dto.authorId
    entity.originalPostId = undefined
    entity.originalAuthorId = undefined
    entity.comments = []
    entity.likes = []
    entity.repostedBy = []
    entity.isRepost = false

    return entity
  }
}
