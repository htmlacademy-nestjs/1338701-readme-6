import { Entity, IAuthUser, IUser, StorableEntity } from '@project/shared/core'

export class BlogUserEntity extends Entity implements StorableEntity<IUser> {
  public email: string
  public username: string
  public passwordHash: string | null
  public avatarId?: string
  public createdAt: string
  public updatedAt: string

  constructor(user?: IAuthUser) {
    super()
    this.populate(user)
  }

  public populate(user?: IAuthUser) {
    if (!user) {
      return
    }
    this.id = user.id
    this.email = user.email
    this.username = user.username
    this.passwordHash = user.passwordHash
    this.avatarId = user.avatarId
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
  }

  toPOJO(): IUser {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      avatarId: this.avatarId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }

  public async setPassword(passwordHash: string): Promise<BlogUserEntity> {
    this.passwordHash = passwordHash
    return this
  }
}
