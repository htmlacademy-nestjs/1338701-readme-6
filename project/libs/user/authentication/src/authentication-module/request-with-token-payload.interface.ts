import { ITokenPayload } from '@project/shared/core'

export interface IRequestWithTokenPayload {
  user?: ITokenPayload
}
