import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Refresh token', example: 'token' })
  refreshToken: string
}
