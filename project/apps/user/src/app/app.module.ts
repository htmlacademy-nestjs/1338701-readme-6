import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { BlogUserModule } from '@project/blog-user'
import { AuthenticationModule } from '@project/authentication'
import { getMongooseOptions, AccountConfigModule } from '@project/config'
import { UserNotificationModule } from '@project/user-notification'

@Module({
  imports: [
    BlogUserModule,
    AuthenticationModule,
    AccountConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
    UserNotificationModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
