import { Module } from '@nestjs/common'
import { BlogUserModule } from '@project/blog-user'
import { AuthenticationModule } from '@project/authentication'
import { AccountConfigModule } from 'libs/user/config/src/account-config.module'

@Module({
  imports: [BlogUserModule, AuthenticationModule, AccountConfigModule],
  controllers: [],
  providers: []
})
export class AppModule {}
