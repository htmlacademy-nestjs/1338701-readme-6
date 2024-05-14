import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { BasePostgresRepository } from '@project/data-access'
import { PrismaClientService } from '@project/post-models'
import { PaginationResult, PostStatus } from '@project/shared/core'
import {
  DEFAULT_PAGE_COUNT,
  DEFAULT_POST_COUNT_LIMIT,
  DEFAULT_SEARCH_LIMIT
} from 'libs/post/blog-post/src/blog-post-module/blog-post.constant'
import { BlogPostQuery } from 'libs/post/blog-post/src/blog-post-module/blog-post.query'
import { CommonPostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/common-post.entity'
import { CommonPostFactory } from 'libs/post/blog-post/src/blog-post-module/factories/common-post.factory'

@Injectable()
export class CommonPostRepository extends BasePostgresRepository<CommonPostEntity> {
  constructor(protected readonly entityFactory: CommonPostFactory, readonly client: PrismaClientService) {
    super(entityFactory, client)
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where })
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit)
  }

  public async findById(id: string): Promise<CommonPostEntity> {
    const document = await this.client.post.findFirst({
      where: {
        id
      },
      include: {
        tags: true,
        comments: true,
        postVideo: true,
        postLink: true,
        postText: true,
        postQuote: true,
        postPhoto: true
      }
    })

    if (!document) {
      throw new NotFoundException(`Post with id ${id} not found.`)
    }
    return this.createEntityFromDocument(document)
  }

  public async findAll(query?: BlogPostQuery, filterByAuthor?: string): Promise<PaginationResult<CommonPostEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined
    const take = query?.limit || DEFAULT_POST_COUNT_LIMIT
    const where: Prisma.PostWhereInput = {
      status: query?.filterByStatus
    }
    const orderBy: Prisma.PostOrderByWithRelationInput = {}

    if (query?.tags) {
      where.tags = {
        some: {
          id: {
            in: query.tags
          }
        }
      }
    }

    if (filterByAuthor) {
      where.authorId = filterByAuthor
    }

    if (query?.filterByType) {
      where.type = query.filterByType
    }

    if (query?.sortDirection && query?.sortByField) {
      orderBy[query.sortByField] = query.sortDirection
    }

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          tags: true,
          comments: true,
          postVideo: true,
          postLink: true,
          postText: true,
          postQuote: true,
          postPhoto: true
        }
      }),
      this.getPostCount(where)
    ])

    return {
      content: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page || DEFAULT_PAGE_COUNT,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount
    }
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id
      }
    })
  }

  public async update(entity: CommonPostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO()
    await this.client.post.update({
      where: { id: pojoEntity.id },
      data: {
        title: pojoEntity.title,
        type: pojoEntity.type,
        authorId: pojoEntity.authorId,
        likes: pojoEntity.likes,
        postText: pojoEntity.postText ? { update: pojoEntity.postText } : undefined,
        postLink: pojoEntity.postLink ? { update: pojoEntity.postLink } : undefined,
        postPhoto: pojoEntity.postPhoto ? { update: pojoEntity.postPhoto } : undefined,
        postVideo: pojoEntity.postVideo ? { update: pojoEntity.postVideo } : undefined,
        postQuote: pojoEntity.postQuote ? { update: pojoEntity.postQuote } : undefined,
        tags: {
          set: pojoEntity.tags.map((tag) => ({
            id: tag.id
          }))
        }
      },
      include: {
        tags: true,
        comments: true,
        postLink: true,
        postPhoto: true,
        postQuote: true,
        postText: true,
        postVideo: true
      }
    })
  }

  public async likePost(postId: string, userId: string) {
    await this.client.post.update({
      where: { id: postId },
      data: {
        likes: { push: userId },
        likesCount: { increment: 1 }
      }
    })
  }

  public async dislikePost(postId: string, updatedLikes: string[]) {
    await this.client.post.update({
      where: { id: postId },
      data: {
        likes: updatedLikes,
        likesCount: { decrement: 1 }
      }
    })
  }

  public async repostPost(originalPost: CommonPostEntity, userId: string) {
    const repostedPost = await this.client.post.create({
      data: {
        type: originalPost.type,
        title: originalPost.title,
        authorId: userId, // Изменяем автора на текущего пользователя
        originalAuthorId: originalPost.authorId, // Сохраняем информацию об оригинальном авторе
        originalPostId: originalPost.id, // Сохраняем ID оригинальной публикации
        likes: [],
        isRepost: true,
        repostedBy: { set: [userId] },
        tags: {
          connect: originalPost.tags.map((tag) => ({
            id: tag.id
          }))
        },
        comments: { connect: [] }, // Пока нет комментариев
        status: originalPost.status,
        createdAt: originalPost.createdAt, // Устанавливаем текущую дату и время
        updatedAt: originalPost.updatedAt, // Устанавливаем текущую дату и время
        publishedAt: new Date() // Устанавливаем текущую дату и время
      },
      include: {
        comments: true,
        tags: true,
        postVideo: true,
        postLink: true,
        postText: true,
        postQuote: true,
        postPhoto: true
      }
    })

    await this.client.post.update({
      where: { id: originalPost.id },
      data: {
        repostedBy: { push: userId }
      }
    })

    return this.createEntityFromDocument(repostedPost)
  }

  public async findUserPosts(userId: string, query?: BlogPostQuery): Promise<PaginationResult<CommonPostEntity>> {
    return await this.findAll(query, userId)
  }

  async searchByTitle(title: string) {
    const foundPosts = await this.client.post.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive'
        }
      },
      take: DEFAULT_SEARCH_LIMIT,
      include: {
        comments: true,
        tags: true,
        postVideo: true,
        postLink: true,
        postText: true,
        postQuote: true,
        postPhoto: true
      }
    })

    return foundPosts.map((post) => this.createEntityFromDocument(post))
  }
}
