import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { fillDto } from '@project/shared/helpers'
import { POST_NOT_FOUND, POST_SUCCESSFULLY_DELETED } from 'libs/post/blog-post/src/blog-post.constant'
import { BlogPostService } from 'libs/post/blog-post/src/blog-post.service'
import { CreatePostDto } from 'libs/post/blog-post/src/dto/create-post.dto'
import { PostRdo } from 'libs/post/blog-post/src/rdo/post.rdo'
import { Response } from 'express'

@ApiTags('Posts')
@Controller('posts')
export class BlogPostController {
  constructor(private readonly blogPostService: BlogPostService) {}
  private test: any
  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'The new post  has been successfully created.'
  })
  @Post('create')
  public async create(@Body() dto: CreatePostDto) {
    const newPost = await this.blogPostService.createPost(dto)
    return newPost.toPOJO()
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Post found'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: POST_NOT_FOUND
  })
  @Get(':postId')
  public async show(@Param('postId') id: string) {
    const existPost = await this.blogPostService.getPost(id)
    return existPost.toPOJO()
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Posts found'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: POST_NOT_FOUND
  })
  @Get('/')
  public async showAll() {
    const commonPostEntities = await this.blogPostService.getAllPosts()
    const posts = commonPostEntities.map((post) => post.toPOJO())
    return fillDto(PostRdo, posts)
  }

  @Delete('/:postId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('postId') id: string, @Res() res: Response) {
    await this.blogPostService.deleteCategory(id)
    return res.status(HttpStatus.OK).json({ message: POST_SUCCESSFULLY_DELETED })
  }
}
