import { NotFoundException } from '@nestjs/common'
import { BasePostgresRepository } from '@project/data-access'
import { PrismaClientService } from '@project/post-models'
import { Entity, EntityFactory, IPost, StorableEntity } from '@project/shared/core'

export abstract class BasePostRepository<
  EntityPost extends Entity & StorableEntity<ReturnType<EntityPost['toPOJO']>>,
  InterfacePost extends IPost
> extends BasePostgresRepository<EntityPost, InterfacePost> {
  constructor(protected entityFactory: EntityFactory<EntityPost>, protected readonly client: PrismaClientService) {
    super(entityFactory, client)
  }
}
