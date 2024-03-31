import { Controller, Get, Param } from '@nestjs/common'

import { BlogUserService } from 'libs/user/blog-user/src/blog-user-module/blog-user.service'

@Controller('users')
export class BlogUserController {
  constructor(private readonly blogUserService: BlogUserService) {}
  @Get(':userId')
  public async show(@Param('userId') id: string) {
    const existUser = await this.blogUserService.getUser(id)
    return existUser.toPOJO()
  }
}
