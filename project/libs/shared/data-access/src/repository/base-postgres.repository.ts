import { PrismaClientService } from '@project/post-models'
import { Entity, StorableEntity, IEntityFactory } from '@project/shared/core'
import { Repository } from './repository.interface'

export abstract class BasePostgresRepository<T extends Entity & StorableEntity<ReturnType<T['toPOJO']>>>
  implements Repository<T>
{
  constructor(protected entityFactory: IEntityFactory<T>, protected readonly client: PrismaClientService) {}

  protected createEntityFromDocument(document: unknown): T {
    return this.entityFactory.create(document as ReturnType<T['toPOJO']>)
  }

  public async findById(id: T['id']): Promise<T> {
    throw new Error('Not implemented')
  }

  public async save(entity: T): Promise<void> {
    throw new Error('Not implemented')
  }

  public async update(entity: T): Promise<void> {
    throw new Error('Not implemented')
  }

  public async deleteById(id: T['id']): Promise<void> {
    throw new Error('Not implemented')
  }
}
