import { Expose } from 'class-transformer'

export class LoggedUserRdo {
  @Expose()
  public _id: string

  @Expose()
  public username: string

  @Expose()
  public email: string

  @Expose()
  public accessToken: string
}
