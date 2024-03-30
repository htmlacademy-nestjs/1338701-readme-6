import { Module } from '@nestjs/common'
import { BlogUserModule } from '@project/blog-user'
import { BcryptHasher } from 'libs/shared/helpers/src/hasher/bcrypt.hasher'
import { SALT_ROUNDS } from 'libs/user/authentication/src/authentication-module/authentication.constant'
import { AuthenticationController } from './authentication.controller'
import { AuthenticationService } from './authentication.service'

@Module({
  imports: [BlogUserModule],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    {
      provide: 'SaltRound',
      useValue: SALT_ROUNDS
    },
    {
      provide: 'Hasher',
      useClass: BcryptHasher
    }
  ]
})
export class AuthenticationModule {}
