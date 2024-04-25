import { Injectable } from '@nestjs/common'
import { Constructor } from '@nestjs/common/utils/merge-with-values.util'
import { ModuleRef } from '@nestjs/core'
import { PostType } from '@project/shared/core'
import { FACTORIES_METADATA_KEY } from 'libs/post/blog-post/src/blog-post-module/blog-post.constant'
import { FactoriesType } from 'libs/post/blog-post/src/blog-post-module/decorators/factories-type.decorator'
import { IPostFactory } from 'libs/post/blog-post/src/blog-post-module/factories/types/post-factory.interface'

@Injectable()
export class FactoryTypeFactory {
  constructor(private moduleRef: ModuleRef) {}

  public create(type: PostType): IPostFactory<any> {
    const definedFactories: Map<string, Constructor<any>> = Reflect.getOwnMetadata(
      FACTORIES_METADATA_KEY,
      FactoriesType
    )

    const factory = definedFactories.get(type) as Constructor<any>
    return this.moduleRef.get(factory)
  }
}
