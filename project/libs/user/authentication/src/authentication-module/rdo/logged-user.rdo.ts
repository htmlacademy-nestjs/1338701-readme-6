import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { ApiDescription } from 'libs/user/authentication/src/authentication-module/authentication.constant'

export class LoggedUserRdo {
  @ApiProperty({
    description: ApiDescription.ID,
    example: 'String'
  })
  @Expose()
  public id: string

  @ApiProperty({
    description: ApiDescription.USERNAME,
    example: 'String'
  })
  @Expose()
  public username: string

  @ApiProperty({
    description: ApiDescription.EMAIL,
    example: 'String'
  })
  @Expose()
  public email: string

  @ApiProperty({
    description: ApiDescription.ACCESS_TOKEN,
    example: 'String'
  })
  @Expose()
  public accessToken: string
}
