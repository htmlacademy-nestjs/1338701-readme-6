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
  Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { CommentRdo, CreateCommentDto } from '@project/blog-comment'
import { InjectUserIdInterceptor } from '@project/interceptors'
import { fillDto } from '@project/shared/helpers'
import { CheckAuthGuard } from 'apps/api-gateway/src/app/guards/check-auth.guard'
import { POST_NOT_FOUND } from 'libs/post/blog-post/src/blog-post-module/blog-post.constant'
import { BlogPostQuery } from 'libs/post/blog-post/src/blog-post-module/blog-post.query'
import { BlogPostService } from 'libs/post/blog-post/src/blog-post-module/blog-post.service'
import { CreatePostDto } from 'libs/post/blog-post/src/blog-post-module/dto/create-post.dto'
import { ActionWithUserDto } from 'libs/post/blog-post/src/blog-post-module/dto/action-with-user.dto'
import { UpdatePostDto } from 'libs/post/blog-post/src/blog-post-module/dto/update-post.dto'
import { PostWithPaginationRdo } from 'libs/post/blog-post/src/blog-post-module/rdo/post-with-pagination.rdo'
import { PostRdo } from 'libs/post/blog-post/src/blog-post-module/rdo/post.rdo'
import { PostNotificationService } from 'libs/post/post-notification/src/post-notification-module/post-notification.service'

@ApiTags('Posts')
@Controller('posts')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService,
    private readonly postNotificationService: PostNotificationService
  ) {}
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

  @Post('/notify')
  public async notifyAboutNewPosts() {
    const posts = await this.blogPostService.getAllPosts()
    await this.postNotificationService.sendPosts(posts.content)
  }

  @Patch('/:postId/like')
  public async likePost(@Param('postId') postId: string, @Body() { userId }: ActionWithUserDto) {
    console.log(postId, userId)
    return await this.blogPostService.likePost(postId, userId)
  }

  @Patch('/:postId/dislike')
  public async dislikePost(@Param('postId') postId: string, @Body() { userId }: ActionWithUserDto) {
    return await this.blogPostService.dislikePost(postId, userId)
  }

  @Post('/:postId/repost')
  public async repostPost(@Param('postId') postId: string, @Body() { userId }: ActionWithUserDto) {
    const repostedPost = await this.blogPostService.repostPost(postId, userId)
    return fillDto(PostRdo, repostedPost.toPOJO())
  }

  @Get('/user/:userId') // Определим путь для получения постов пользователя
  public async getUserPosts(@Param('userId') userId: string, @Query() query?: BlogPostQuery) {
    const postWithPagination = await this.blogPostService.getUserPost(userId, query)
    const result = {
      ...postWithPagination,
      content: postWithPagination.content.map((post) => post.toPOJO())
    }
    return fillDto(PostWithPaginationRdo, result)
  }
}
