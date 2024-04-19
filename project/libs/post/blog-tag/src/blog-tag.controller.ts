import { Controller, Get, Param, Post, Body, Delete, Patch, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { fillDto } from '@project/shared/helpers'
import { BlogTagService } from 'libs/post/blog-tag/src/blog-tag.service'
import { CreateTagDto } from 'libs/post/blog-tag/src/dto/create-tag.dto'
import { UpdateTagDto } from 'libs/post/blog-tag/src/dto/update-tag.dto'

import { TagRdo } from 'libs/post/blog-tag/src/rdo/tag.rdo'

@ApiTags('Tags')
@Controller('tags')
export class BlogTagController {
  constructor(private readonly blogTagService: BlogTagService) {}

  @ApiResponse({
    type: TagRdo,
    status: HttpStatus.OK,
    description: 'Tag found'
  })
  @Get('/:tagId')
  public async show(@Param('tagId') tagId: string) {
    const tagEntity = await this.blogTagService.getTag(tagId)
    return fillDto(TagRdo, tagEntity.toPOJO())
  }

  @ApiResponse({
    type: [TagRdo],
    status: HttpStatus.OK,
    description: 'Tags found'
  })
  @Get('/')
  public async index() {
    const blogTagEntities = await this.blogTagService.getAllTags()
    const tags = blogTagEntities.map((blogTag) => blogTag.toPOJO())
    return fillDto(TagRdo, tags)
  }

  @Post('/create')
  public async create(@Body() dto: CreateTagDto) {
    const newTag = await this.blogTagService.createTag(dto)
    return fillDto(TagRdo, newTag.toPOJO())
  }

  @Delete('/:tagId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('tagId') tagId: string) {
    await this.blogTagService.deleteTag(tagId)
  }

  @Patch('/:tagId')
  public async update(@Param('tagId') tagId: string, @Body() dto: UpdateTagDto) {
    const updatedTag = await this.blogTagService.updateTag(tagId, dto)
    return fillDto(TagRdo, updatedTag.toPOJO())
  }
}
