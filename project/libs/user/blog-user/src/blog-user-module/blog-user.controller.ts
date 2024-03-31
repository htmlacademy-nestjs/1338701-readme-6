import { Controller, Get, Param } from '@nestjs/common'
import { BlogUserService } from '@project/blog-user'

@Controller('users')
export class BlogUserController {
  constructor(private readonly blogUserService: BlogUserService) {}

  @Get(':id')
  public async show(@Param('id') id: string) {
    const existUser = await this.blogUserService.getUser(id)
    return existUser.toPOJO()
  }
}
