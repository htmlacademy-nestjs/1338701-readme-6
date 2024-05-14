import { HttpService } from '@nestjs/axios'
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
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
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { CommentRdo, CreateCommentDto } from '@project/blog-comment'
import { ActionWithUserDto, BlogPostQuery, CreatePostDto, PostSearchRdo, UpdatePostDto } from '@project/blog-post'
import { InjectAuthorIdInterceptor, InjectUserIdInterceptor } from '@project/interceptors'
import { IPost, IRequestWithPayload, PostStatus } from '@project/shared/core'
import { PostService } from 'apps/api-gateway/src/app/post.service'
import { POST_NOT_FOUND, PostApiDescriptions } from 'libs/post/blog-post/src/blog-post-module/blog-post.constant'
import { PostWithPaginationRdo } from 'libs/post/blog-post/src/blog-post-module/rdo/post-with-pagination.rdo'
import { PostRdo } from 'libs/post/blog-post/src/blog-post-module/rdo/post.rdo'
import { ApplicationServiceURL } from './app.config'

import { AxiosExceptionFilter } from './filters/axios-exception.filter'
import { CheckAuthGuard } from './guards/check-auth.guard'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

@ApiTags('Posts')
@Controller('posts')
@UseFilters(AxiosExceptionFilter)
export class PostController {
  constructor(private readonly httpService: HttpService, private readonly postService: PostService) {}

  @ApiResponse({
    type: [PostRdo],
    status: HttpStatus.OK,
    description: PostApiDescriptions.SearchByTitle
  })
  @Get('/search')
  async searchByTitle(@Query('title') title: string) {
    const { data: posts } = await this.httpService.axiosRef.get<PostSearchRdo>(
      `${ApplicationServiceURL.Posts}/search`,
      {
        params: { title }
      }
    )

    return this.postService.getPostsInfoWithAuthors(posts)
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: PostApiDescriptions.CreatePost
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectAuthorIdInterceptor)
  @Post('create')
  public async create(@Body() dto: CreatePostDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}/create`, dto)
    return data
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: PostApiDescriptions.FoundPost
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: POST_NOT_FOUND
  })
  @Get(':postId')
  public async show(@Param('postId') postId: string) {
    const { data } = await this.httpService.axiosRef.get<IPost>(`${ApplicationServiceURL.Posts}/${postId}`)
    return data
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: PostApiDescriptions.ShowAll
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: POST_NOT_FOUND
  })
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

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostApiDescriptions.Destroy
  })
  @UseGuards(CheckAuthGuard)
  @Delete(':postId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePost(@Param('postId') postId: string, @Req() req: IRequestWithPayload) {
    const post = await this.show(postId)
    const userId = req.user.sub
    const isWrongAuthor = post.authorId !== userId

    if (isWrongAuthor) {
      throw new ForbiddenException('Only the author can delete this post')
    }

    await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Posts}/${postId}`)
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: PostApiDescriptions.Update
  })
  @Patch('/:postId')
  async updatePost(@Param('postId') postId: string, @Body() dto: UpdatePostDto) {
    const { data: post } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Posts}/${postId}`, dto)
    console.log(post)
    return post
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: PostApiDescriptions.CreateComment
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectAuthorIdInterceptor)
  @Post('/:postId/comments')
  public async createComment(@Param('postId') postId: string, @Body() dto: CreateCommentDto) {
    const { data: comment } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Posts}/${postId}/comments`,
      dto
    )
    return comment
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: PostApiDescriptions.DestroyComment
  })
  @Delete('/:postId/comments/:commentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroyComment(@Param('postId') postId: string, @Param('commentId') commentId: string) {
    await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Posts}/${postId}/comments/${commentId}`)
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostApiDescriptions.NotifyAboutNewPosts
  })
  @Post('/notify')
  public async notifyAboutNewPosts() {
    await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}/notify`)
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostApiDescriptions.LikePost
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Patch('/:postId/like')
  public async likePost(@Param('postId') postId: string, @Body() dto: ActionWithUserDto) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Posts}/${postId}/like`, dto)
    return data
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostApiDescriptions.DislikePost
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Patch('/:postId/dislike')
  public async dislikePost(@Param('postId') postId: string, @Body() dto: ActionWithUserDto) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Posts}/${postId}/dislike`, dto)
    return data
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: PostApiDescriptions.RepostPost
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('/:postId/repost') // Определим путь для репоста
  public async repostPost(@Param('postId') postId: string, @Body() dto: ActionWithUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}/${postId}/repost`, dto)
    return data
  }

  @ApiResponse({
    type: PostWithPaginationRdo,
    status: HttpStatus.OK,
    description: PostApiDescriptions.GetUserPosts
  })
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

  @ApiResponse({
    type: PostWithPaginationRdo,
    status: HttpStatus.OK,
    description: PostApiDescriptions.FoundDrafts
  })
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
}
