import { Injectable } from '@nestjs/common'
import { BaseMemoryRepository, BasePostgresRepository } from '@project/data-access'
import { PrismaClientService } from '@project/post-models'
import { IPostText, IPostVideo, PostType } from '@project/shared/core'
import { RepositoryType } from 'libs/post/blog-post/src/decorators/repository-type.decorator'
import { TextPostEntity } from 'libs/post/blog-post/src/entities/text-post.entity'
import { VideoPostEntity } from 'libs/post/blog-post/src/entities/video-post.entity'
import { TextPostFactory } from 'libs/post/blog-post/src/factories/text-post.factory'

@Injectable()
@RepositoryType(PostType.Text)
export class TextPostRepository extends BasePostgresRepository<TextPostEntity> {
  constructor(protected readonly entityFactory: TextPostFactory, readonly client: PrismaClientService) {
    super(entityFactory, client)
  }

  public async save(entity: VideoPostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO()
    const record = await this.client.post.create({
      data: {
        ...pojoEntity,
        tags: undefined,
        comments: { connect: [] },
        postText: { create: pojoEntity.postText },
        postVideo: undefined,
        postLink: undefined,
        postPhoto: undefined,
        postQuote: undefined
      }
    })

    entity.id = record.id
  }
}
