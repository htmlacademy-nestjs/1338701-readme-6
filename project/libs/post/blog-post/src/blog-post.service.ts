import { Injectable } from '@nestjs/common'
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

    const blogPost: IPost = {
      type: dto.type,
      title: dto.title,
      tags: dto.tags,
      authorId: randomUUID(),
      comments: [],
      likes: [],
      postLink: dto.postLink,
      postVideo: dto.postVideo,
      postPhoto: dto.postPhoto,
      postQuote: dto.postQuote,
      postText: dto.postText
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
}
