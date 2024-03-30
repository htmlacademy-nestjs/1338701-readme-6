import { Injectable } from '@nestjs/common';
import {
  BaseMemoryRepository
} from 'libs/shared/data-access/src/repository/base-memory.repository';
import {
  BlogUserEntity
} from 'libs/user/blog-user/src/blog-user-module/blog-user.entity';
import {
  BlogUserFactory
} from 'libs/user/blog-user/src/blog-user-module/blog-user.factory';

@Injectable()
export class BlogUserRepository extends BaseMemoryRepository<BlogUserEntity> {
  constructor(entityFactory: BlogUserFactory) {
    super(entityFactory);
  }
}
