import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { ApiDescription } from 'libs/user/authentication/src/authentication-module/authentication.constant'

export class LoggedUserRdo {
  @ApiProperty({
    description: ApiDescription.Id,
    example: 'String'
  })
  @Expose()
  public id: string

  @ApiProperty({
    description: ApiDescription.Username,
    example: 'String'
  })
  @Expose()
  public username: string

  @ApiProperty({
    description: ApiDescription.Email,
    example: 'String'
  })
  @Expose()
  public email: string

  @ApiProperty({
    description: ApiDescription.AccessToken,
    example: 'String'
  })
  @Expose()
  public accessToken: string
}
