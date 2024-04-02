import { Injectable, NotFoundException } from '@nestjs/common'
import { IPost } from '@project/shared/core'
import dayjs from 'dayjs'
import { POST_NOT_FOUND } from 'libs/post/blog-post/src/blog-post-module/blog-post.constant'
import { BlogPostRepository } from 'libs/post/blog-post/src/blog-post-module/blog-post.repository'
import { CreatePostDto } from 'libs/post/blog-post/src/blog-post-module/dto/create-post.dto'
import { PostContentFactory } from 'libs/post/blog-post/src/blog-post-module/factories/post-content.factory'
import { DATE_FORMAT } from 'libs/user/authentication/src/authentication-module/authentication.constant'
import { randomUUID } from 'node:crypto'

@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
    private readonly postContentFactory: PostContentFactory
  ) {}

  public async createPost(dto: CreatePostDto) {
    const currentTime = dayjs().format(DATE_FORMAT)

    const contentRepository = this.postContentFactory.create(dto.type)

    if (!contentRepository) {
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
      publishedAt: currentTime,
      createdAt: currentTime,
      updatedAt: currentTime
    }

    contentRepository.save()
  }

  public async getPost(id: string) {
    const existUser = await this.blogPostRepository.findById(id)

    if (!existUser) {
      throw new NotFoundException(POST_NOT_FOUND)
    }

    return existUser
  }
}
