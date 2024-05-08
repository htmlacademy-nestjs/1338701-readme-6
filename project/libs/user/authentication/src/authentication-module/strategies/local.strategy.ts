import { PassportStrategy } from '@nestjs/passport'
import { BlogUserEntity } from '@project/blog-user'
import { AuthenticationService } from 'libs/user/authentication/src/authentication-module/authentication.service'
import { Strategy } from 'passport-local'
import { Injectable } from '@nestjs/common'

const USERNAME_FIELD_NAME = 'email'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthenticationService) {
    super({ usernameField: USERNAME_FIELD_NAME })
  }

  public async validate(email: string, password: string): Promise<BlogUserEntity> {
    return this.authService.verifyUser({ email, password })
  }
}
