import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaClientService } from '@project/post-models'

import { BasePostgresRepository } from '@project/data-access'
import { MAX_TAG_LIMIT } from 'libs/post/blog-tag/src/blog-tag.constant'
import { BlogTagEntity } from 'libs/post/blog-tag/src/blog-tag.entity'
import { BlogTagFactory } from 'libs/post/blog-tag/src/blog-tag.factory'
import { TagFilter, tagFilterToPrismaFilter } from 'libs/post/blog-tag/src/blog-tag.filter'

@Injectable()
export class BlogTagRepository extends BasePostgresRepository<BlogTagEntity> {
  constructor(tagFactory: BlogTagFactory, readonly client: PrismaClientService) {
    super(tagFactory, client)
  }

  public async save(entity: BlogTagEntity): Promise<void> {
    const record = await this.client.tag.create({
      data: { ...entity.toPOJO() }
    })

    entity.id = record.id
  }

  public async findById(id: string): Promise<BlogTagEntity> {
    const document = await this.client.tag.findFirst({
      where: {
        id
      }
    })

    if (!document) {
      throw new NotFoundException(`Category with id ${id} not found.`)
    }

    return this.createEntityFromDocument(document)
  }

  public async find(filter?: TagFilter): Promise<BlogTagEntity[]> {
    const where = tagFilterToPrismaFilter(filter)
    const documents = await this.client.tag.findMany({
      where,
      take: MAX_TAG_LIMIT
    })

    return documents.map((document) => this.createEntityFromDocument(document))
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.tag.delete({
      where: {
        id
      }
    })
  }

  public async update(tagEntity: BlogTagEntity): Promise<void> {
    await this.client.tag.update({
      where: { id: tagEntity.id },
      data: {
        name: tagEntity.name
      }
    })
  }

  public async findByIds(ids: string[]): Promise<BlogTagEntity[]> {
    const records = await this.client.tag.findMany({
      where: {
        id: {
          in: ids
        }
      }
    })

    return records.map((record) => this.createEntityFromDocument(record))
  }
}
