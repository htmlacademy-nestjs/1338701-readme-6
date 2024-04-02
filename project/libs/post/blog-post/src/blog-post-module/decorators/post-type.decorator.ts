import { Constructor } from '@nestjs/common/utils/merge-with-values.util'
import { PostType } from '@project/shared/core'
import { VALIDATORS_METADATA_KEY } from 'libs/post/blog-post/src/blog-post-module/blog-post.constant'
import { BasePostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/base-post.entity'

export const PostContent = (type: PostType) => (constructor: Constructor<any>) => {
  let definedValidators: Map<string, Constructor<any>> | undefined = Reflect.getOwnMetadata(
    VALIDATORS_METADATA_KEY,
    PostContent
  )
  if (!definedValidators) {
    definedValidators = new Map()
  }

  definedValidators.set(type, constructor)
  Reflect.defineMetadata(VALIDATORS_METADATA_KEY, definedValidators, PostContent)
}
