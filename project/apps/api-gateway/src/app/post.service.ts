import { HttpService } from '@nestjs/axios'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InformationUserRdo } from '@project/blog-user'
import { ApplicationServiceURL } from 'apps/api-gateway/src/app/app.config'
import { PostWithPaginationRdo } from 'libs/post/blog-post/src/blog-post-module/rdo/post-with-pagination.rdo'

@Injectable()
export class PostService {
  constructor(private readonly httpService: HttpService) {}

  public async getPostsInfoWithAuthors(posts: PostWithPaginationRdo) {
    if (posts.content.length === 0) {
      throw new NotFoundException('Posts not found')
    }
    const userIds = posts.content.map((post) => post.authorId)

    const { data: users } = await this.httpService.axiosRef.get<InformationUserRdo[]>(
      `${ApplicationServiceURL.Users}/usersByIds`,
      {
        params: { id: userIds }
      }
    )

    return posts.content.map((post) => ({
      ...post,
      authorInfo: users.find((user) => user._id === post.authorId)
    }))
  }
}
