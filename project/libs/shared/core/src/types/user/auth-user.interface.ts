import { IUser } from 'libs/shared/core/src/types/user/user.interface'

export interface IAuthUser extends IUser {
  passwordHash?: string
}
