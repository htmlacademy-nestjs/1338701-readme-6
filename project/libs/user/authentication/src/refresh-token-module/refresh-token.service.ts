import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { jwtConfig } from '@project/config'
import dayjs from 'dayjs'

import { parseTime } from '@project/shared/helpers'
import { IRefreshTokenPayload } from 'libs/shared/core/src/types/token/refresh-token-payload.interface'

import { RefreshTokenRepository } from './refresh-token.repository'
import { RefreshTokenEntity } from './refresh-token.entity'

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>
  ) {}

  public async createRefreshSession(payload: IRefreshTokenPayload) {
    const timeValue = parseTime(this.jwtOptions.refreshTokenExpiresIn)
    console.log(payload)
    const refreshToken = new RefreshTokenEntity({
      tokenId: payload.tokenId,
      createdAt: new Date(),
      userId: payload.sub,
      expiresIn: dayjs().add(timeValue.value, timeValue.unit).toDate()
    })

    return this.refreshTokenRepository.save(refreshToken)
  }

  public async deleteRefreshSession(tokenId: string): Promise<void> {
    await this.deleteExpiredRefreshTokens()
    await this.refreshTokenRepository.deleteByTokenId(tokenId)
  }

  public async isExists(tokenId: string): Promise<boolean> {
    const refreshToken = await this.refreshTokenRepository.findByTokenId(tokenId)
    return refreshToken !== null
  }

  public async deleteExpiredRefreshTokens() {
    await this.refreshTokenRepository.deleteExpiredTokens()
  }
}
