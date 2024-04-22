import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { CommentRdo, CreateCommentDto } from '@project/blog-comment'
import { fillDto } from '@project/shared/helpers'
import { POST_NOT_FOUND } from 'libs/post/blog-post/src/blog-post-module/blog-post.constant'
import { BlogPostQuery } from 'libs/post/blog-post/src/blog-post-module/blog-post.query'
import { BlogPostService } from 'libs/post/blog-post/src/blog-post-module/blog-post.service'
import { CreatePostDto } from 'libs/post/blog-post/src/blog-post-module/dto/create-post.dto'
import { UpdatePostDto } from 'libs/post/blog-post/src/blog-post-module/dto/update-post.dto'
import { PostWithPaginationRdo } from 'libs/post/blog-post/src/blog-post-module/rdo/post-with-pagination.rdo'
import { PostRdo } from 'libs/post/blog-post/src/blog-post-module/rdo/post.rdo'

@ApiTags('Posts')
@Controller('posts')
export class BlogPostController {
  constructor(private readonly blogPostService: BlogPostService) {}
  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created'
  })
  @Post('create')
  public async create(@Body() dto: CreatePostDto) {
    const newPost = await this.blogPostService.createPost(dto)
    return newPost.toPOJO()
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'The post has benn successfully founded'
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
  public async showAll(@Query() query: BlogPostQuery) {
    const postWithPagination = await this.blogPostService.getAllPosts(query)
    const result = {
      ...postWithPagination,
      content: postWithPagination.content.map((post) => post.toPOJO())
    }

    return fillDto(PostWithPaginationRdo, result)
  }

  @ApiResponse({
    status: HttpStatus.OK
  })
  @Delete('/:postId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('postId') id: string) {
    await this.blogPostService.deleteCategory(id)
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'The post has been successfully updated'
  })
  // TODO: ВАЖНО! Нужно решить проблему с валидацией типов поста. Сейчас можно записать два типа в один документ, что недопустимо.
  @Patch('/:postId')
  public async update(@Param('postId') postId: string, @Body() dto: UpdatePostDto) {
    const updatedPost = await this.blogPostService.updatePost(postId, dto)
    return fillDto(PostRdo, updatedPost.toPOJO())
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: 'The new comment has been successfully created'
  })
  @Post('/:postId/comments')
  public async createComment(@Param('postId') postId: string, @Body() dto: CreateCommentDto) {
    const newComment = await this.blogPostService.addComment(postId, dto)
    return fillDto(CommentRdo, newComment.toPOJO())
  }
}
