import { Module } from '@nestjs/common'
import { BlogUserModule } from '@project/blog-user'

import { BcryptHasher } from '@project/shared/helpers'
import { SALT_ROUNDS } from './authentication.constant'
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
