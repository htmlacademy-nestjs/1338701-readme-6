import { Controller, Get, Param, Post, Body, Delete, Patch, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { TagResponseDescription } from './blog-tag.constant'

import { fillDto } from '@project/shared/helpers'
import { BlogTagService } from 'libs/post/blog-tag/src/blog-tag-module/blog-tag.service'
import { CreateTagDto } from 'libs/post/blog-tag/src/blog-tag-module/dto/create-tag.dto'
import { UpdateTagDto } from 'libs/post/blog-tag/src/blog-tag-module/dto/update-tag.dto'

import { TagRdo } from 'libs/post/blog-tag/src/blog-tag-module/rdo/tag.rdo'

@ApiTags('Tags')
@Controller('tags')
export class BlogTagController {
  constructor(private readonly blogTagService: BlogTagService) {}

  @ApiResponse({ type: TagRdo, status: HttpStatus.OK, description: TagResponseDescription.TagFound })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: TagResponseDescription.TagNotFound })
  @Get('/:tagId')
  public async show(@Param('tagId') tagId: string) {
    const tagEntity = await this.blogTagService.getTag(tagId)
    return fillDto(TagRdo, tagEntity.toPOJO())
  }

  @ApiResponse({ type: [TagRdo], status: HttpStatus.OK, description: TagResponseDescription.AllTagsRetrieved })
  @Get('/')
  public async index() {
    const blogTagEntities = await this.blogTagService.getAllTags()
    const tags = blogTagEntities.map((blogTag) => blogTag.toPOJO())
    return fillDto(TagRdo, tags)
  }

  @ApiResponse({ status: HttpStatus.CREATED, description: TagResponseDescription.TagCreated })
  @Post('/create')
  public async create(@Body() dto: CreateTagDto) {
    const newTag = await this.blogTagService.createTag(dto)
    return fillDto(TagRdo, newTag.toPOJO())
  }

  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: TagResponseDescription.TagDeleted })
  @Delete('/:tagId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('tagId') tagId: string) {
    await this.blogTagService.deleteTag(tagId)
  }

  @ApiResponse({ status: HttpStatus.OK, description: TagResponseDescription.TagUpdated })
  @Patch('/:tagId')
  public async update(@Param('tagId') tagId: string, @Body() dto: UpdateTagDto) {
    const updatedTag = await this.blogTagService.updateTag(tagId, dto)
    return fillDto(TagRdo, updatedTag.toPOJO())
  }
}
