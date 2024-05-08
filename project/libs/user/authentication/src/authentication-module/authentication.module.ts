import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { BlogUserModule } from '@project/blog-user'
import { getJwtOptions } from '@project/config'

import { BcryptHasher } from '@project/shared/helpers'
import { UserNotificationModule } from '@project/user-notification'
import { SALT_ROUNDS } from 'libs/user/authentication/src/authentication-module/authentication.constant'
import { AuthenticationController } from 'libs/user/authentication/src/authentication-module/authentication.controller'
import { AuthenticationService } from 'libs/user/authentication/src/authentication-module/authentication.service'
import { JwtAccessStrategy } from 'libs/user/authentication/src/authentication-module/strategies/jwt-access.strategy'
import { JwtRefreshStrategy } from 'libs/user/authentication/src/authentication-module/strategies/jwt-refresh.strategy'
import { LocalStrategy } from 'libs/user/authentication/src/authentication-module/strategies/local.strategy'
import { RefreshTokenModule } from 'libs/user/authentication/src/refresh-token-module/refresh-token.module'

@Module({
  imports: [
    BlogUserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    }),
    UserNotificationModule,
    RefreshTokenModule
  ],
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
    },
    JwtAccessStrategy,
    LocalStrategy,
    JwtRefreshStrategy
  ]
})
export class AuthenticationModule {}
