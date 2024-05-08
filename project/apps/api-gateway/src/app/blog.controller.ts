import { Body, Controller, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { CreatePostDto } from 'libs/post/blog-post/src/blog-post-module/dto/create-post.dto'

import { AxiosExceptionFilter } from './filters/axios-exception.filter'
import { CheckAuthGuard } from './guards/check-auth.guard'
import { ApplicationServiceURL } from './app.config'

@Controller('posts')
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(private readonly httpService: HttpService) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseInterceptors)
  @Post('/create')
  public async create(@Body() dto: CreatePostDto) {
    console.log(dto)
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}/create`, dto)
    return data
  }
}
