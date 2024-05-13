import { Expose } from 'class-transformer'
import { PostRdo } from 'libs/post/blog-post/src/blog-post-module/rdo/post.rdo'

export class PostSearchRdo {
  @Expose()
  public content: PostRdo[]
}
