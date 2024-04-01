import { Injectable, NotFoundException } from '@nestjs/common'
import { IPost, PostType } from '@project/shared/core'
import dayjs from 'dayjs'
import { POST_NOT_FOUND } from 'libs/post/blog-post/src/blog-post-module/blog-post.constant'
import { BlogPostEntity } from 'libs/post/blog-post/src/blog-post-module/blog-post.entity'
import { BlogPostRepository } from 'libs/post/blog-post/src/blog-post-module/blog-post.repository'
import { CreatePostDto } from 'libs/post/blog-post/src/blog-post-module/dto/create-post.dto'
import { DATE_FORMAT } from 'libs/user/authentication/src/authentication-module/authentication.constant'
import { randomUUID } from 'node:crypto'

@Injectable()
export class BlogPostService {
  constructor(private readonly blogPostRepository: BlogPostRepository) {}

  public async createPost(dto: CreatePostDto): Promise<BlogPostEntity> {
    const currentTime = dayjs().format(DATE_FORMAT)

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
      publishedAt: currentTime,
      createdAt: currentTime,
      updatedAt: currentTime
    }

    const comparatorTypeEntity = {
      [PostType.Link]: await new BlogPostEntity(blogPost).setPostLink(dto.postLink),
      [PostType.Photo]: await new BlogPostEntity(blogPost).setPostPhoto(dto.postPhoto),
      [PostType.Text]: await new BlogPostEntity(blogPost).setPostText(dto.postText),
      [PostType.Quote]: await new BlogPostEntity(blogPost).setPostQuote(dto.postQuote),
      [PostType.Video]: await new BlogPostEntity(blogPost).setPostVideo(dto.postVideo)
    }

    const blogPostEntity = comparatorTypeEntity[dto.type]
    await this.blogPostRepository.save(blogPostEntity)
    return blogPostEntity
  }

  public async getPost(id: string): Promise<BlogPostEntity> {
    const existUser = await this.blogPostRepository.findById(id)

    if (!existUser) {
      throw new NotFoundException(POST_NOT_FOUND)
    }

    return existUser
  }
}
