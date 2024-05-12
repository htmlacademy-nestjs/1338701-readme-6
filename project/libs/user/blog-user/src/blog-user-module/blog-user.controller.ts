import { Body, Controller, Get, Injectable, Param, Query } from '@nestjs/common'
import { fillDto } from '@project/shared/helpers'
import { BlogUserService } from 'libs/user/blog-user/src/blog-user-module/blog-user.service'
import { InformationUserRdo } from 'libs/user/blog-user/src/blog-user-module/rdo/information-user.rdo'

@Injectable()
@Controller('users')
export class BlogUserController {
  constructor(private readonly blogUserService: BlogUserService) {}

  @Get('/usersByIds')
  public async getUsersByIds(@Query('id') userIds: string[]) {
    const userEntities = await this.blogUserService.getUsersByIds(userIds)
    const users = userEntities.map((userEntity) => userEntity?.toPOJO())
    return fillDto(InformationUserRdo, users)
  }
}
