import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaClientService } from '@project/post-models'

import { BasePostgresRepository } from '@project/data-access'
import { BlogCommentEntity } from 'libs/post/blog-comment/src/blog-comment-module/blog-comment.entity'
import { BlogCommentFactory } from 'libs/post/blog-comment/src/blog-comment-module/blog-comment.factory'

@Injectable()
export class BlogCommentRepository extends BasePostgresRepository<BlogCommentEntity> {
  constructor(commentFactory: BlogCommentFactory, readonly client: PrismaClientService) {
    super(commentFactory, client)
  }

  public async save(entity: BlogCommentEntity): Promise<void> {
    const record = await this.client.comment.create({
      data: { ...entity.toPOJO() }
    })

    entity.id = record.id
  }

  public async findById(id: string): Promise<BlogCommentEntity> {
    const document = await this.client.comment.findFirst({
      where: {
        id
      }
    })

    if (!document) {
      throw new NotFoundException(`Category with id ${id} not found.`)
    }

    return this.createEntityFromDocument(document)
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.comment.delete({
      where: {
        id
      }
    })
  }

  public async findByPostId(postId: string): Promise<BlogCommentEntity[]> {
    const records = await this.client.comment.findMany({
      where: {
        postId
      }
    })

    return records.map((record) => this.createEntityFromDocument(record))
  }
}
