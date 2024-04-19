import { Controller, Get, HttpStatus, Param } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { BlogUserService } from 'libs/user/blog-user/src/blog-user-module/blog-user.service'
import { UserRdo } from 'libs/user/blog-user/src/blog-user-module/rdo/user.rdo'

@ApiTags('Users')
@Controller('users')
export class BlogUserController {
  constructor(private readonly blogUserService: BlogUserService) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @Get(':userId')
  public async show(@Param('userId') id: string) {
    const existUser = await this.blogUserService.getUser(id)
    return existUser.toPOJO()
  }
}
