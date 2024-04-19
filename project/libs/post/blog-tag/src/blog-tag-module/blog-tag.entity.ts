import { Entity, ITag, StorableEntity } from '@project/shared/core'

export class BlogTagEntity extends Entity implements StorableEntity<ITag> {
  public name: string
  public createdAt?: Date
  public updatedAt?: Date

  constructor(tag?: ITag) {
    super()
    this.populate(tag)
  }

  public populate(tag?: ITag) {
    if (!tag) {
      return
    }

    this.id = tag.id
    this.name = tag.name
    this.createdAt = tag.createdAt
    this.updatedAt = tag.updatedAt
  }

  toPOJO(): ITag {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
