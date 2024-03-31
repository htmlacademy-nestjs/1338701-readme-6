import { Module } from '@nestjs/common'
import { BlogUserModule } from '@project/blog-user'
import { AuthenticationController, AuthenticationService, SALT_ROUNDS } from '@project/authentication'
import { BcryptHasher } from '@project/shared/helpers'

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
