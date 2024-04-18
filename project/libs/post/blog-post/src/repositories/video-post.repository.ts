import { Injectable } from '@nestjs/common'
import { BasePostgresRepository } from '@project/data-access'
import { PrismaClientService } from '@project/post-models'
import { PostType } from '@project/shared/core'
import { RepositoryType } from 'libs/post/blog-post/src/decorators/repository-type.decorator'
import { VideoPostEntity } from 'libs/post/blog-post/src/entities/video-post.entity'
import { VideoPostFactory } from 'libs/post/blog-post/src/factories/video-post.factory'

@Injectable()
@RepositoryType(PostType.Video)
export class VideoPostRepository extends BasePostgresRepository<VideoPostEntity> {
  constructor(protected readonly entityFactory: VideoPostFactory, readonly client: PrismaClientService) {
    super(entityFactory, client)
  }

  public async save(entity: VideoPostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO()
    const record = await this.client.post.create({
      data: {
        ...pojoEntity,
        comments: { connect: [] },
        postVideo: { create: pojoEntity.postVideo },
        postLink: undefined,
        postPhoto: undefined,
        postQuote: undefined,
        postText: undefined
      }
    })

    entity.id = record.id
  }
}
