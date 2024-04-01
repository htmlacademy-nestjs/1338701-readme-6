import { Injectable } from '@nestjs/common'
import { EntityFactory, IPost } from '@project/shared/core'
import { BlogPostEntity } from 'libs/post/blog-post/src/blog-post-module/blog-post.entity'
@Injectable()
export class BlogPostFactory implements EntityFactory<BlogPostEntity> {
  create(entityPlainData: IPost): BlogPostEntity {
    return new BlogPostEntity(entityPlainData)
  }
}
