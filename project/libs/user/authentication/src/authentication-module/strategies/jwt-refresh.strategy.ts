import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { jwtConfig } from '@project/config'
import { ITokenPayload } from '@project/shared/core'
import { AuthenticationService } from 'libs/user/authentication/src/authentication-module/authentication.service'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigType } from '@nestjs/config'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthenticationService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtOptions.refreshTokenSecret
    })
  }

  public async validate(payload: ITokenPayload) {
    return this.authService.getUserByEmail(payload.email)
  }
}
