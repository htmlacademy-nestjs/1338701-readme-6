import { Injectable } from '@nestjs/common'
import { EntityFactory, IUser } from '@project/shared/core'
import { BlogUserEntity } from 'libs/user/blog-user/src/blog-user-module/blog-user.entity'
@Injectable()
export class BlogUserFactory implements EntityFactory<BlogUserEntity> {
  create(entityPlainData: IUser): BlogUserEntity {
    return new BlogUserEntity(entityPlainData)
  }
}
