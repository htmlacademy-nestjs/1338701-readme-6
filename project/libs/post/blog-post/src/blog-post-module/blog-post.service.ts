import { Injectable, NotFoundException } from '@nestjs/common'
import { BaseMemoryRepository } from '@project/data-access'
import { Entity, EntityFactory, IPost } from '@project/shared/core'
import dayjs from 'dayjs'
import { POST_NOT_FOUND } from 'libs/post/blog-post/src/blog-post-module/blog-post.constant'
import { CreatePostDto } from 'libs/post/blog-post/src/blog-post-module/dto/create-post.dto'
import { BasePostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/base-post.entity'
import { FactoryTypeFactory } from 'libs/post/blog-post/src/blog-post-module/factories/factory-type.factory'
import { LinkPostFactory } from 'libs/post/blog-post/src/blog-post-module/factories/link-post.factory'
import { RepositoryTypeFactory } from 'libs/post/blog-post/src/blog-post-module/factories/repository-type.factory'
import { DATE_FORMAT } from 'libs/user/authentication/src/authentication-module/authentication.constant'
import { randomUUID } from 'node:crypto'

@Injectable()
export class BlogPostService {
  private postFactory?: EntityFactory<any>
  private postRepository?: BaseMemoryRepository<any>
  constructor(
    private readonly factoryTypeFactory: FactoryTypeFactory,
    private readonly repositoriesTypeFactory: RepositoryTypeFactory
  ) {}

  public async createPost(dto: CreatePostDto) {
    const currentTime = dayjs().format(DATE_FORMAT)

    this.postFactory = this.factoryTypeFactory.create(dto.type)
    this.postRepository = this.repositoriesTypeFactory.create(dto.type)

    if (!this.postFactory || !this.postRepository) {
      return
    }

    const blogPost: IPost = {
      id: null,
      type: dto.type,
      title: dto.title,
      tags: dto.tags,
      authorId: randomUUID(),
      likes: [],
      comments: [],
      isDraft: false,
      isRepost: false,
      postLink: dto.postLink,
      postVideo: dto.postVideo,
      publishedAt: currentTime,
      createdAt: currentTime,
      updatedAt: currentTime
    }

    const entityPost = this.postFactory.create(blogPost)
    await this.postRepository.save(entityPost)

    return entityPost
  }
}
