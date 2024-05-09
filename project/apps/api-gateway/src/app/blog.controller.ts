import { Body, Controller, Param, Patch, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { InjectAuthorIdInterceptor, InjectUserIdInterceptor } from '@project/interceptors'
import { CreatePostDto } from 'libs/post/blog-post/src/blog-post-module/dto/create-post.dto'
import { LikePostDto } from 'libs/post/blog-post/src/blog-post-module/dto/like-post.dto'

import { AxiosExceptionFilter } from './filters/axios-exception.filter'
import { CheckAuthGuard } from './guards/check-auth.guard'
import { ApplicationServiceURL } from './app.config'

@Controller('posts')
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(private readonly httpService: HttpService) {}

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
  public async likePost(@Param('postId') postId: string, @Body() dto: LikePostDto) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Posts}/${postId}/like`, dto)
    return data
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Patch('/:postId/dislike')
  public async dislikePost(@Param('postId') postId: string, @Body() dto: LikePostDto) {
    console.log(dto)
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Posts}/${postId}/dislike`, dto)
    return data
  }
}
