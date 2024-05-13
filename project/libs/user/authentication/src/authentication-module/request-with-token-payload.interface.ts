import { ITokenPayload } from '@project/shared/core'
import { Request } from 'express'

export interface IRequestWithTokenPayload extends Request {
  user?: ITokenPayload
}
