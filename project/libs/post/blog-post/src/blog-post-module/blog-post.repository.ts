import { Injectable } from '@nestjs/common'
import { BaseMemoryRepository } from '@project/data-access'
import { BlogPostEntity } from 'libs/post/blog-post/src/blog-post-module/blog-post.entity'
import { BlogPostFactory } from 'libs/post/blog-post/src/blog-post-module/blog-post.factory'

@Injectable()
export class BlogPostRepository extends BaseMemoryRepository<BlogPostEntity> {
  constructor(protected readonly entityFactory: BlogPostFactory) {
    super(entityFactory)
  }
}
