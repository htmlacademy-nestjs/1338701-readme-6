import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { getMongooseOptions } from '@project/config'
import { EmailSubscriberModule } from '@project/email-subscriber'
import { NotifyConfigModule } from '@project/notification-config'

@Module({
  imports: [MongooseModule.forRootAsync(getMongooseOptions()), NotifyConfigModule, EmailSubscriberModule],
  controllers: [],
  providers: []
})
export class AppModule {}
