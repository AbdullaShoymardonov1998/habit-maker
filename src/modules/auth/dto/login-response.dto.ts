import { GetUserResponseDto } from '@/modules/users/dto/get-user.dto'
import { ApiProperty } from '@nestjs/swagger'

export class TokenDto {
  @ApiProperty({ description: "User's access token" })
  accessToken: string

  @ApiProperty({ description: "User's refresh token" })
  refreshToken: string
}

export class LoginResponseDto {
  @ApiProperty({ description: 'User information' })
  user: GetUserResponseDto

  @ApiProperty({ description: 'User tokens' })
  token: TokenDto
}
