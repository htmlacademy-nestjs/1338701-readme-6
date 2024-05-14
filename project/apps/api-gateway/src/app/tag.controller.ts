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
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateTagDto, TagRdo, TagResponseDescription } from '@project/blog-tag'
import { CheckAuthGuard } from 'apps/api-gateway/src/app/guards/check-auth.guard'

import { UpdateTagDto } from 'libs/post/blog-tag/src/blog-tag-module/dto/update-tag.dto'
import { ApplicationServiceURL } from './app.config'

import { AxiosExceptionFilter } from './filters/axios-exception.filter'

@ApiTags('Tags')
@Controller('tags')
@UseFilters(AxiosExceptionFilter)
export class TagController {
  constructor(private readonly httpService: HttpService) {}

  @ApiResponse({ type: TagRdo, status: HttpStatus.OK, description: TagResponseDescription.TagFound })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: TagResponseDescription.TagNotFound })
  @Get('/:tagId')
  async show(@Param('tagId') tagId: string) {
    const { data: tag } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tag}/${tagId}`)
    return tag
  }

  @ApiResponse({ type: [TagRdo], status: HttpStatus.OK, description: TagResponseDescription.AllTagsRetrieved })
  @Get('/')
  public async index() {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Tag}`)
    return data
  }

  @ApiResponse({ status: HttpStatus.CREATED, description: TagResponseDescription.TagCreated })
  @UseGuards(CheckAuthGuard)
  @Post('/create')
  public async create(@Body() dto: CreateTagDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Tag}/create`, dto)
    return data
  }

  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: TagResponseDescription.TagDeleted })
  @UseGuards(CheckAuthGuard)
  @Delete('/:tagId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('tagId') tagId: string) {
    await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Tag}/${tagId}`)
  }

  @ApiResponse({ status: HttpStatus.OK, description: TagResponseDescription.TagUpdated })
  @UseGuards(CheckAuthGuard)
  @Patch('/:tagId')
  public async update(@Param('tagId') tagId: string, @Body() dto: UpdateTagDto) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Tag}/${tagId}`, dto)
    return data
  }
}
