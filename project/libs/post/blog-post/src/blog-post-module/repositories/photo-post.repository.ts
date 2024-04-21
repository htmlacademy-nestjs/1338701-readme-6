import { Injectable } from '@nestjs/common'
import { BasePostgresRepository } from '@project/data-access'
import { PrismaClientService } from '@project/post-models'
import { PostType } from '@project/shared/core'
import { RepositoryType } from 'libs/post/blog-post/src/blog-post-module/decorators/repository-type.decorator'
import { PhotoPostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/photo-post.entity'
import { VideoPostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/video-post.entity'
import { PhotoPostFactory } from 'libs/post/blog-post/src/blog-post-module/factories/photo-post.factory'

@Injectable()
@RepositoryType(PostType.Photo)
export class PhotoPostRepository extends BasePostgresRepository<PhotoPostEntity> {
  constructor(protected readonly entityFactory: PhotoPostFactory, readonly client: PrismaClientService) {
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
        postPhoto: { create: pojoEntity.postPhoto },
        postQuote: undefined,
        postText: undefined,
        postVideo: undefined,
        postLink: undefined
      }
    })

    entity.id = record.id
  }
}
