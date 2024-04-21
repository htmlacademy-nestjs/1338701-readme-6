import { Expose } from 'class-transformer'
import { PostRdo } from 'libs/post/blog-post/src/blog-post-module/rdo/post.rdo'

export class PostWithPaginationRdo {
  @Expose()
  public content: PostRdo[]

  @Expose()
  public totalPages: number

  @Expose()
  public totalItems: number

  @Expose()
  public currentPage: number

  @Expose()
  public itemsPerPage: number
}
