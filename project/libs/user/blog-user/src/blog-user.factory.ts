import { Injectable } from '@nestjs/common'
import { EntityFactory, IAuthUser, IUser } from '@project/shared/core'
import { BlogUserEntity } from 'libs/user/blog-user/src/blog-user.entity'
@Injectable()
export class BlogUserFactory implements EntityFactory<BlogUserEntity> {
  create(entityPlainData: IAuthUser): BlogUserEntity {
    return new BlogUserEntity(entityPlainData)
  }
}
