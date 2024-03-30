import { Module } from '@nestjs/common';
import {
  BlogUserFactory
} from 'libs/user/blog-user/src/blog-user-module/blog-user.factory';
import {
  BlogUserRepository
} from 'libs/user/blog-user/src/blog-user-module/blog-user.repository';

@Module({
  providers: [
    {
      provide: BlogUserRepository,
      useClass: BlogUserRepository
    },
    {
      provide: BlogUserFactory,
      useClass: BlogUserFactory
    }
  ]
})
export class BlogUserModule {
}
