import { Constructor } from '@nestjs/common/utils/merge-with-values.util'
import { PostType } from 'project/libs/shared/core/src'
import { FACTORIES_METADATA_KEY, REPOSITORIES_METADATA_KEY } from 'project/libs/post/blog-post/src/blog-post.constant'
export const FactoriesType = (type: PostType) => (constructor: Constructor<any>) => {
  let definedFactories: Map<string, Constructor<any>> | undefined = Reflect.getOwnMetadata(
    FACTORIES_METADATA_KEY,
    FactoriesType
  )
  if (!definedFactories) {
    definedFactories = new Map()
  }
  definedFactories.set(type, constructor)
  Reflect.defineMetadata(FACTORIES_METADATA_KEY, definedFactories, FactoriesType)
}