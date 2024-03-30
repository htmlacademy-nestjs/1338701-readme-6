import { Expose } from 'class-transformer'

export class UserRdo {
  @Expose()
  public id: string

  @Expose()
  public avatar: string

  @Expose()
  public email: string

  @Expose()
  public nickname: string

  @Expose()
  public createAt: string

  @Expose()
  public postCount: string

  @Expose()
  public subscriberCounter: string
}
