import { Injectable, NotFoundException } from '@nestjs/common'
import { BasePostgresRepository } from '@project/data-access'
import { PrismaClientService } from '@project/post-models'
import { IPost } from '@project/shared/core'
import { MAX_POST_LIMIT } from 'libs/post/blog-post/src/blog-post.constant'
import { CommonPostEntity } from 'libs/post/blog-post/src/entities/common-post.entity'
import { CommonPostFactory } from 'libs/post/blog-post/src/factories/common-post.factory'

@Injectable()
export class CommonPostRepository extends BasePostgresRepository<CommonPostEntity> {
  constructor(protected readonly entityFactory: CommonPostFactory, readonly client: PrismaClientService) {
    super(entityFactory, client)
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

  public async findAll(): Promise<CommonPostEntity[]> {
    const documents = await this.client.post.findMany({
      take: MAX_POST_LIMIT,
      include: {
        comments: true,
        postVideo: true,
        postLink: true,
        postText: true,
        postQuote: true,
        postPhoto: true
      }
    })

    return documents.map((document) => this.createEntityFromDocument(document))
  }
}
