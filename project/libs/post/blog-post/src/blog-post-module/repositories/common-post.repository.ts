import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { BasePostgresRepository } from '@project/data-access'
import { PrismaClientService } from '@project/post-models'
import { PaginationResult } from '@project/shared/core'
import {
  DEFAULT_PAGE_COUNT,
  DEFAULT_POST_COUNT_LIMIT
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

  public async findAll(query?: BlogPostQuery): Promise<PaginationResult<CommonPostEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined
    const take = query?.limit || DEFAULT_POST_COUNT_LIMIT
    const where: Prisma.PostWhereInput = {}
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

    if (query?.sortDirection) {
      orderBy.createdAt = query.sortDirection
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
    await this.client.post.update({
      where: { id: entity.id },
      data: {
        title: entity.title
      }
    })
  }
}
