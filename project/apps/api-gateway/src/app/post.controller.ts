import { HttpService } from '@nestjs/axios'
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { ActionWithUserDto, BlogPostQuery, CreatePostDto } from '@project/blog-post'
import { InjectAuthorIdInterceptor, InjectUserIdInterceptor } from '@project/interceptors'
import { IPost, IRequestWithPayload, PostStatus } from '@project/shared/core'
import { PostService } from 'apps/api-gateway/src/app/post.service'
import { PostWithPaginationRdo } from 'libs/post/blog-post/src/blog-post-module/rdo/post-with-pagination.rdo'
import { ApplicationServiceURL } from './app.config'

import { AxiosExceptionFilter } from './filters/axios-exception.filter'
import { CheckAuthGuard } from './guards/check-auth.guard'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

@Controller('posts')
@UseFilters(AxiosExceptionFilter)
export class PostController {
  constructor(private readonly httpService: HttpService, private readonly postService: PostService) {}

  @Get(':postId')
  public async show(@Param('postId') postId: string) {
    const { data } = await this.httpService.axiosRef.get<IPost>(`${ApplicationServiceURL.Posts}/${postId}`)
    return data
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectAuthorIdInterceptor)
  @Post('create')
  public async create(@Body() dto: CreatePostDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}/create`, dto)
    return data
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Patch('/:postId/like')
  public async likePost(@Param('postId') postId: string, @Body() dto: ActionWithUserDto) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Posts}/${postId}/like`, dto)
    return data
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Patch('/:postId/dislike')
  public async dislikePost(@Param('postId') postId: string, @Body() dto: ActionWithUserDto) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Posts}/${postId}/dislike`, dto)
    return data
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('/:postId/repost') // Определим путь для репоста
  public async repostPost(@Param('postId') postId: string, @Body() dto: ActionWithUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}/${postId}/repost`, dto)
    return data
  }

  @Get('/')
  public async showAll(@Query() query?: BlogPostQuery) {
    const { data: posts } = await this.httpService.axiosRef.get<PostWithPaginationRdo>(
      `${ApplicationServiceURL.Posts}`,
      {
        params: query
      } as { params: BlogPostQuery }
    )

    if (posts.content.length === 0) {
      throw new NotFoundException('Posts not found')
    }

    return this.postService.getPostsInfoWithAuthors(posts)
  }

  @UseGuards(CheckAuthGuard)
  @Get('user/:userId')
  public async getUserPosts(@Param('userId') userId: string, @Query() query?: BlogPostQuery) {
    const { data: posts } = await this.httpService.axiosRef.get<PostWithPaginationRdo>(
      `${ApplicationServiceURL.Posts}/user/${userId}`,
      {
        params: query
      } as { params: BlogPostQuery }
    )
    return this.postService.getPostsInfoWithAuthors(posts)
  }

  @UseGuards(CheckAuthGuard)
  @Get('/drafts')
  public async getUserDrafts(@Req() req: IRequestWithPayload) {
    const { data: posts } = await this.httpService.axiosRef.get<PostWithPaginationRdo>(
      `${ApplicationServiceURL.Posts}/user/${req.user.sub}`,
      {
        params: { filterByStatus: PostStatus.Draft }
      } as { params: BlogPostQuery }
    )
    return this.postService.getPostsInfoWithAuthors(posts)
  }

  @UseGuards(CheckAuthGuard)
  @Delete(':postId')
  async deletePost(@Param('postId') postId: string, @Req() req: IRequestWithPayload) {
    const post = await this.show(postId)
    const userId = req.user.sub
    const isWrongAuthor = post.authorId !== userId

    if (isWrongAuthor) {
      throw new ForbiddenException('Only the author can delete this post')
    }

    await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Posts}/${postId}`)
  }
}
