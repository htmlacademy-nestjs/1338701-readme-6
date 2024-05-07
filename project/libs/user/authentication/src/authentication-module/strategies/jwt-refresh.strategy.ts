import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { jwtConfig } from '@project/config'
import { IRefreshTokenPayload } from 'libs/shared/core/src/types/token/refresh-token-payload.interface'
import { AuthenticationService } from 'libs/user/authentication/src/authentication-module/authentication.service'
import { TokenNotExistsException } from 'libs/user/authentication/src/authentication-module/exceptions/token-not-exists.exception'
import { RefreshTokenService } from 'libs/user/authentication/src/refresh-token-module/refresh-token.service'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigType } from '@nestjs/config'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthenticationService,
    private readonly refreshTokenService: RefreshTokenService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtOptions.refreshTokenSecret
    })
  }

  public async validate(payload: IRefreshTokenPayload) {
    if (!(await this.refreshTokenService.isExists(payload.tokenId))) {
      throw new TokenNotExistsException(payload.tokenId)
    }

    await this.refreshTokenService.deleteRefreshSession(payload.tokenId)
    await this.refreshTokenService.deleteExpiredRefreshTokens()

    return this.authService.getUserByEmail(payload.email)
  }
}
