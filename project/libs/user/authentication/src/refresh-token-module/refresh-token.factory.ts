import { Injectable } from '@nestjs/common'
import { IEntityFactory, IJwtToken } from '@project/shared/core'

import { RefreshTokenEntity } from './refresh-token.entity'

@Injectable()
export class RefreshTokenFactory implements IEntityFactory<RefreshTokenEntity> {
  public create(entityPlainData: IJwtToken): RefreshTokenEntity {
    return new RefreshTokenEntity(entityPlainData)
  }
}
