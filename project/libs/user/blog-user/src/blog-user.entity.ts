import { Entity, IUser, StorableEntity } from '@project/shared/core'

export class BlogUserEntity extends Entity implements StorableEntity<IUser> {
  public email: string
  public username: string
  public passwordHash: string | null
  public avatarId?: string
  public createdAt: string
  public updatedAt: string

  constructor(user?: IUser) {
    super()
    this.populate(user)
  }

  public populate(user?: IUser) {
    if (!user) {
      return
    }
    this.id = user.id
    this.email = user.email
    this.username = user.username
    this.avatarId = user.avatarId
  }

  toPOJO(): IUser {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      avatarId: this.avatarId
    }
  }

  public async setPassword(passwordHash: string): Promise<BlogUserEntity> {
    this.passwordHash = passwordHash
    return this
  }
}
