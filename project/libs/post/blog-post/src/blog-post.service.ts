import { Injectable, NotFoundException } from '@nestjs/common'
import { IPost } from '@project/shared/core'
import { CreatePostDto } from 'libs/post/blog-post/src/dto/create-post.dto'
import { CommonPostEntity } from 'libs/post/blog-post/src/entities/common-post.entity'
import { FactoryTypeFactory } from 'libs/post/blog-post/src/factories/factory-type.factory'
import { RepositoryTypeFactory } from 'libs/post/blog-post/src/factories/repository-type.factory'
import { CommonPostRepository } from 'libs/post/blog-post/src/repositories/common-post.repository'
import { randomUUID } from 'node:crypto'

@Injectable()
export class BlogPostService {
  constructor(
    private readonly factoryTypeFactory: FactoryTypeFactory,
    private readonly repositoriesTypeFactory: RepositoryTypeFactory,
    private readonly commonPostRepository: CommonPostRepository
  ) {}

  public async createPost(dto: CreatePostDto) {
    const postFactory = this.factoryTypeFactory.create(dto.type)
    const postRepository = this.repositoriesTypeFactory.create(dto.type)

    if (!postFactory || !postRepository) {
      return
    }

    const entityPost = postFactory.create(dto)
    await postRepository.save(entityPost)

    return entityPost
  }

  public async getPost(id: string): Promise<CommonPostEntity> {
    return await this.commonPostRepository.findById(id)
  }

  public async getAllPosts(): Promise<CommonPostEntity[]> {
    return await this.commonPostRepository.findAll()
  }

  public async deleteCategory(id: string): Promise<void> {
    try {
      await this.commonPostRepository.deleteById(id)
    } catch {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }
  }
}
