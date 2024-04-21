import { Injectable } from '@nestjs/common'
import { BaseMemoryRepository, BasePostgresRepository } from '@project/data-access'
import { PrismaClientService } from '@project/post-models'
import { PostType } from '@project/shared/core'
import { RepositoryType } from 'libs/post/blog-post/src/blog-post-module/decorators/repository-type.decorator'
import { CommonPostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/common-post.entity'
import { LinkPostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/link-post.entity'
import { VideoPostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/video-post.entity'
import { LinkPostFactory } from 'libs/post/blog-post/src/blog-post-module/factories/link-post.factory'

@Injectable()
@RepositoryType(PostType.Link)
export class LinkPostRepository extends BasePostgresRepository<LinkPostEntity> {
  constructor(protected readonly entityFactory: LinkPostFactory, readonly client: PrismaClientService) {
    super(entityFactory, client)
  }

  public async save(entity: VideoPostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO()
    const record = await this.client.post.create({
      data: {
        ...pojoEntity,
        tags: {
          connect: pojoEntity.tags.map(({ id }) => ({ id }))
        },
        comments: { connect: [] },
        postLink: { create: pojoEntity.postLink },
        postPhoto: undefined,
        postQuote: undefined,
        postText: undefined,
        postVideo: undefined
      }
    })

    entity.id = record.id
  }
}
