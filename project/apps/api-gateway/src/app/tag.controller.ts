import { HttpService } from '@nestjs/axios'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseFilters,
  UseGuards
} from '@nestjs/common'
import { CreateTagDto } from '@project/blog-tag'
import { CheckAuthGuard } from 'apps/api-gateway/src/app/guards/check-auth.guard'

import { UpdateTagDto } from 'libs/post/blog-tag/src/blog-tag-module/dto/update-tag.dto'
import { ApplicationServiceURL } from './app.config'

import { AxiosExceptionFilter } from './filters/axios-exception.filter'

@Controller('tags')
@UseFilters(AxiosExceptionFilter)
export class TagController {
  constructor(private readonly httpService: HttpService) {}

  @Get('/:tagId')
  async show(@Param('tagId') tagId: string) {
    const { data: tag } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tag}/${tagId}`)
    return tag
  }

  @Get('/')
  public async index() {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tag}`)
    return data
  }

  @UseGuards(CheckAuthGuard)
  @Post('/create')
  public async create(@Body() dto: CreateTagDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Tag}/create`, dto)
    return data
  }

  @UseGuards(CheckAuthGuard)
  @Delete('/:tagId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('tagId') tagId: string) {
    await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Tag}/${tagId}`)
  }

  @UseGuards(CheckAuthGuard)
  @Patch('/:tagId')
  public async update(@Param('tagId') tagId: string, @Body() dto: UpdateTagDto) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Tag}/${tagId}`, dto)
    return data
  }
}
