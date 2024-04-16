import { Constructor } from '@nestjs/common/utils/merge-with-values.util'
import { PostType } from '@project/shared/core'
import { REPOSITORIES_METADATA_KEY } from 'libs/post/blog-post/src/blog-post.constant'
export const RepositoryType = (type: PostType) => (constructor: Constructor<any>) => {
  let definedRepositories: Map<string, Constructor<any>> | undefined = Reflect.getOwnMetadata(
    REPOSITORIES_METADATA_KEY,
    RepositoryType
  )
  if (!definedRepositories) {
    definedRepositories = new Map()
  }
  definedRepositories.set(type, constructor)
  Reflect.defineMetadata(REPOSITORIES_METADATA_KEY, definedRepositories, RepositoryType)
}
