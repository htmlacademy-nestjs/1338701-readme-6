import { Injectable, NotFoundException } from '@nestjs/common'
import { BasePostgresRepository } from '@project/data-access'
import { PrismaClientService } from '@project/post-models'
import { IPostVideo, PostType } from '@project/shared/core'
import { RepositoryType } from 'libs/post/blog-post/src/decorators/repository-type.decorator'
import { VideoPostEntity } from 'libs/post/blog-post/src/entities/video-post.entity'
import { VideoPostFactory } from 'libs/post/blog-post/src/factories/video-post.factory'

@Injectable()
@RepositoryType(PostType.Video)
export class VideoPostRepository extends BasePostgresRepository<VideoPostEntity, IPostVideo> {
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

  public async findById(id: string): Promise<VideoPostEntity> {
    const document = await this.client.post.findFirst({
      where: {
        id
      },
      include: {
        postVideo: true
      }
    })

    if (!document) {
      throw new NotFoundException(`Post with id ${id} not found.`)
    }

    return this.createEntityFromDocument(document)
  }
}
