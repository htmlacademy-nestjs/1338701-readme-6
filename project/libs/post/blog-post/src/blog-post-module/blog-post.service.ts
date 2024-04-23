import { Injectable, NotFoundException } from '@nestjs/common'
import { BlogCommentEntity, BlogCommentFactory, CreateCommentDto } from '@project/blog-comment'
import { PaginationResult } from '@project/shared/core'
import { BlogCommentRepository } from 'libs/post/blog-comment/src/blog-comment-module/blog-comment.repository'
import { BlogPostQuery } from 'libs/post/blog-post/src/blog-post-module/blog-post.query'
import { CreatePostDto } from 'libs/post/blog-post/src/blog-post-module/dto/create-post.dto'
import { UpdatePostDto } from 'libs/post/blog-post/src/blog-post-module/dto/update-post.dto'
import { CommonPostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/common-post.entity'
import { FactoryTypeFactory } from 'libs/post/blog-post/src/blog-post-module/factories/factory-type.factory'
import { RepositoryTypeFactory } from 'libs/post/blog-post/src/blog-post-module/factories/repository-type.factory'
import { CommonPostRepository } from 'libs/post/blog-post/src/blog-post-module/repositories/common-post.repository'
import { BlogTagService } from 'libs/post/blog-tag/src/blog-tag-module/blog-tag.service'

@Injectable()
export class BlogPostService {
  constructor(
    private readonly factoryTypeFactory: FactoryTypeFactory,
    private readonly repositoriesTypeFactory: RepositoryTypeFactory,
    private readonly blogTagService: BlogTagService,
    private readonly commonPostRepository: CommonPostRepository,
    private readonly blogCommentFactory: BlogCommentFactory,
    private readonly blogCommentRepository: BlogCommentRepository
  ) {}

  public async createPost(dto: CreatePostDto) {
    const postFactory = this.factoryTypeFactory.create(dto.type)
    const postRepository = this.repositoriesTypeFactory.create(dto.type)

    if (!postFactory || !postRepository) {
      return
    }

    const tags = await this.blogTagService.getTagsByIds(dto.tags)
    const newPost = postFactory.createFromCreatePostDto(dto, tags)
    await postRepository.save(newPost)
    return newPost
  }

  public async getPost(id: string): Promise<CommonPostEntity> {
    return await this.commonPostRepository.findById(id)
  }

  public async getAllPosts(query?: BlogPostQuery): Promise<PaginationResult<CommonPostEntity>> {
    return await this.commonPostRepository.findAll(query)
  }

  public async deleteCategory(id: string): Promise<void> {
    try {
      await this.commonPostRepository.deleteById(id)
    } catch {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }
  }

  public async updatePost(id: string, dto: UpdatePostDto): Promise<CommonPostEntity> {
    const existsPost = await this.commonPostRepository.findById(id)
    let isSameTags = true
    let hasChanges = false

    for (const [key, value] of Object.entries(dto)) {
      const typeKey = key as keyof typeof existsPost
      if (value !== undefined && key !== 'tags' && existsPost[typeKey] !== value) {
        existsPost[typeKey] = value
        hasChanges = true
      }

      if (key === 'tags' && value) {
        const currentTagIds = existsPost.tags.map((tag) => tag.id)
        isSameTags = currentTagIds.length === value.length && currentTagIds.some((tagId) => value.includes(tagId))

        if (!isSameTags && dto.tags) {
          existsPost.tags = await this.blogTagService.getTagsByIds(dto.tags)
        }
      }
    }

    if (isSameTags && !hasChanges) {
      return existsPost
    }
    await this.commonPostRepository.update(existsPost)

    return existsPost
  }

  public async addComment(postId: string, dto: CreateCommentDto): Promise<BlogCommentEntity> {
    const { id } = await this.getPost(postId)
    const newComment = this.blogCommentFactory.createFromDto(dto, id as string)
    await this.blogCommentRepository.save(newComment)

    return newComment
  }
}
