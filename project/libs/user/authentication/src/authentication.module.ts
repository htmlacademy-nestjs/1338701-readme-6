import { Module } from '@nestjs/common'
import { BlogUserModule } from '@project/blog-user'

import { BcryptHasher } from '@project/shared/helpers'
import { SALT_ROUNDS } from 'libs/user/authentication/src/authentication.constant'
import { AuthenticationController } from 'libs/user/authentication/src/authentication.controller'
import { AuthenticationService } from 'libs/user/authentication/src/authentication.service'

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
