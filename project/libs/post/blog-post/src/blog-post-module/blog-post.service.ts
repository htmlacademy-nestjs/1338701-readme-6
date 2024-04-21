import { Injectable, NotFoundException } from '@nestjs/common'
import { PaginationResult } from '@project/shared/core'
import { BlogPostQuery } from 'libs/post/blog-post/src/blog-post-module/blog-post.query'
import { CreatePostDto } from 'libs/post/blog-post/src/blog-post-module/dto/create-post.dto'
import { CommonPostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/common-post.entity'
import { FactoryTypeFactory } from 'libs/post/blog-post/src/blog-post-module/factories/factory-type.factory'
import { RepositoryTypeFactory } from 'libs/post/blog-post/src/blog-post-module/factories/repository-type.factory'
import { CommonPostRepository } from 'libs/post/blog-post/src/blog-post-module/repositories/common-post.repository'
import { BlogTagRepository } from 'libs/post/blog-tag/src/blog-tag-module/blog-tag.repository'
import { BlogTagService } from 'libs/post/blog-tag/src/blog-tag-module/blog-tag.service'

@Injectable()
export class BlogPostService {
  constructor(
    private readonly factoryTypeFactory: FactoryTypeFactory,
    private readonly repositoriesTypeFactory: RepositoryTypeFactory,
    private readonly blogTagService: BlogTagService,
    private readonly commonPostRepository: CommonPostRepository
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
}
