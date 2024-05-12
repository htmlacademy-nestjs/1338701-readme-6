import { ITokenPayload } from '@project/shared/core'

export { Request } from 'express'
export interface IRequestWithPayload extends Request {
  user: ITokenPayload
}
