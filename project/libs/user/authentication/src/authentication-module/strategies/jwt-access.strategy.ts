import { PassportStrategy } from '@nestjs/passport'
import { ITokenPayload } from '@project/shared/core'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.accessTokenSecret')
    })
  }

  public async validate(payload: ITokenPayload) {
    return payload
  }
}
