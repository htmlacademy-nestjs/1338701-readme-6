import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { CommentRdo, CreateCommentDto } from '@project/blog-comment'
import { fillDto } from '@project/shared/helpers'
import { POST_NOT_FOUND, PostApiDescriptions } from 'libs/post/blog-post/src/blog-post-module/blog-post.constant'
import { BlogPostQuery } from 'libs/post/blog-post/src/blog-post-module/blog-post.query'
import { BlogPostService } from 'libs/post/blog-post/src/blog-post-module/blog-post.service'
import { ActionWithUserDto } from 'libs/post/blog-post/src/blog-post-module/dto/action-with-user.dto'
import { CreatePostDto } from 'libs/post/blog-post/src/blog-post-module/dto/create-post.dto'
import { UpdatePostDto } from 'libs/post/blog-post/src/blog-post-module/dto/update-post.dto'
import { PostSearchRdo } from 'libs/post/blog-post/src/blog-post-module/rdo/post-search.rdo'
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
    type: [PostRdo],
    status: HttpStatus.OK,
    description: PostApiDescriptions.SearchByTitle
  })
  @Get('search')
  public async searchByTitle(@Query('title') title: string) {
    const postEntities = await this.blogPostService.searchByTitle(title)
    const posts = postEntities.map((entity) => entity.toPOJO())
    return fillDto(PostSearchRdo, { content: posts })
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: PostApiDescriptions.CreatePost
  })
  @Post('create')
  public async create(@Body() dto: CreatePostDto) {
    const newPost = await this.blogPostService.createPost(dto)
    return newPost.toPOJO()
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
  public async show(@Param('postId') id: string) {
    const existPost = await this.blogPostService.getPost(id)
    return existPost.toPOJO()
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
  public async showAll(@Query() query: BlogPostQuery) {
    const postWithPagination = await this.blogPostService.getAllPosts(query)
    const result = {
      ...postWithPagination,
      content: postWithPagination.content.map((post) => post.toPOJO())
    }

    return fillDto(PostWithPaginationRdo, result)
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostApiDescriptions.Destroy
  })
  @Delete('/:postId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('postId') id: string) {
    await this.blogPostService.deletePost(id)
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: PostApiDescriptions.Update
  })
  @Patch('/:postId')
  public async update(@Param('postId') postId: string, @Body() dto: UpdatePostDto) {
    const updatedPost = await this.blogPostService.updatePost(postId, dto)
    console.log(updatedPost)
    return fillDto(PostRdo, updatedPost.toPOJO())
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: PostApiDescriptions.CreateComment
  })
  @Post('/:postId/comments')
  public async createComment(@Param('postId') postId: string, @Body() dto: CreateCommentDto) {
    const newComment = await this.blogPostService.addComment(postId, dto)
    return fillDto(CommentRdo, newComment.toPOJO())
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: PostApiDescriptions.DestroyComment
  })
  @Delete('/:postId/comments/:commentId')
  public async destroyComment(@Param('commentId') commentId: string) {
    await this.blogPostService.deleteComment(commentId)
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostApiDescriptions.NotifyAboutNewPosts
  })
  @Post('/notify')
  public async notifyAboutNewPosts() {
    const posts = await this.blogPostService.getAllPosts()
    await this.postNotificationService.sendPosts(posts.content)
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostApiDescriptions.LikePost
  })
  @Patch('/:postId/like')
  public async likePost(@Param('postId') postId: string, @Body() { userId }: ActionWithUserDto) {
    return await this.blogPostService.likePost(postId, userId)
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostApiDescriptions.DislikePost
  })
  @Patch('/:postId/dislike')
  public async dislikePost(@Param('postId') postId: string, @Body() { userId }: ActionWithUserDto) {
    return await this.blogPostService.dislikePost(postId, userId)
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: PostApiDescriptions.RepostPost
  })
  @Post('/:postId/repost')
  public async repostPost(@Param('postId') postId: string, @Body() { userId }: ActionWithUserDto) {
    const repostedPost = await this.blogPostService.repostPost(postId, userId)
    return fillDto(PostRdo, repostedPost.toPOJO())
  }

  @ApiResponse({
    type: PostWithPaginationRdo,
    status: HttpStatus.OK,
    description: PostApiDescriptions.GetUserPosts
  })
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
