import { Injectable } from '@nestjs/common'
import { Constructor } from '@nestjs/common/utils/merge-with-values.util'
import { ModuleRef } from '@nestjs/core'
import { BaseMemoryRepository } from '@project/data-access'
import { PostType } from '@project/shared/core'
import { VALIDATORS_METADATA_KEY } from 'libs/post/blog-post/src/blog-post-module/blog-post.constant'

import { PostContent } from 'libs/post/blog-post/src/blog-post-module/decorators/post-type.decorator'
import { BasePostEntity } from 'libs/post/blog-post/src/blog-post-module/entities/base-post.entity'

@Injectable()
export class PostContentFactory {
  constructor(private moduleRef: ModuleRef) {}

  public create(type: PostType): any | undefined {
    const definedValidators: Map<string, Constructor<any>> = Reflect.getOwnMetadata(
      VALIDATORS_METADATA_KEY,
      PostContent
    )
    const postContent = definedValidators.get(type)

    if (postContent) {
      return this.moduleRef.get(postContent)
    }
  }
}
