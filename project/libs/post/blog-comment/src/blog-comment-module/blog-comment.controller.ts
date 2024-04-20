import { Controller, Get, Param, HttpStatus } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { fillDto } from '@project/shared/helpers'
import { BlogCommentService } from 'libs/post/blog-comment/src/blog-comment-module/blog-comment.service'
import { CommentRdo } from 'libs/post/blog-comment/src/blog-comment-module/rdo/comment.rdo'

import { TagRdo } from 'libs/post/blog-tag/src/blog-tag-module/rdo/tag.rdo'

@ApiTags('Comments')
@Controller('posts/:postId/comments')
export class BlogCommentController {
  constructor(private readonly blogCommentService: BlogCommentService) {}

  @ApiResponse({
    type: TagRdo,
    status: HttpStatus.OK,
    description: 'Tag found'
  })
  @Get('/')
  public async show(@Param('postId') postId: string) {
    const comments = await this.blogCommentService.getComments(postId)
    return fillDto(
      CommentRdo,
      comments.map((comment) => comment.toPOJO())
    )
  }
}
