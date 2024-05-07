import { ITokenPayload } from '@project/shared/core'

export interface IRefreshTokenPayload extends ITokenPayload {
  tokenId: string
}
