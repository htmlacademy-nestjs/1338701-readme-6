import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { BlogUserModule } from '@project/blog-user'
import { AuthenticationModule } from '@project/authentication'
import { getMongooseOptions, AccountConfigModule } from '@project/config'

@Module({
  imports: [
    BlogUserModule,
    AuthenticationModule,
    AccountConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions())
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
