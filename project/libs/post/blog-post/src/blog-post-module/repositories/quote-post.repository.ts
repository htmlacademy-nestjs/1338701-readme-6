import { Injectable } from '@nestjs/common'
import { BaseMemoryRepository, BasePostgresRepository } from '@project/data-access'
import { PrismaClientService } from '@project/post-models'
import { PostType } from '@project/shared/core'
import { RepositoryType } from 'libs/post/blog-post/src/blog-post-module/decorators/repository-type.decorator'
import { QuotePostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/quote-post.entity'
import { VideoPostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/video-post.entity'
import { QuotePostFactory } from 'libs/post/blog-post/src/blog-post-module/factories/quote-post.factory'

@Injectable()
@RepositoryType(PostType.Quote)
export class QuotePostRepository extends BasePostgresRepository<QuotePostEntity> {
  constructor(protected readonly entityFactory: QuotePostFactory, readonly client: PrismaClientService) {
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
        postQuote: { create: pojoEntity.postQuote },
        postText: undefined,
        postVideo: undefined,
        postLink: undefined,
        postPhoto: undefined
      }
    })

    entity.id = record.id
  }
}
