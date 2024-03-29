import { IUser } from 'shared/core/src/lib/types/user/user.interface'

export interface IAuthUser extends IUser {
  passwordHash: string
}
