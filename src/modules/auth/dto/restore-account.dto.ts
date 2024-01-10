import { HTTP_MESSAGES } from '@/consts/http-messages'
import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class RestoreAccountDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Generate token',
    required: true,
    example: 'abcdef',
  })
  token: string

  @IsString()
  @MinLength(6)
  @ApiProperty({
    description: 'New password, minimum password length is 6 characters',
    required: true,
    example: 'unicorn',
  })
  password: string
}

export class RestoreAccountResponseDto {
  @ApiProperty({
    description: 'Message',
    example: HTTP_MESSAGES.PASSWORD_UPDATED,
  })
  message: string
}

export class RestoreAccountErrorResponseDto {
  @ApiProperty({
    description: 'Status code',
    example: HttpStatus.BAD_REQUEST,
  })
  statusCode: HttpStatus.BAD_REQUEST

  @ApiProperty({
    description: 'Error message',
    example: [
      HTTP_MESSAGES.RESTORE_LINK_TOKEN_NOT_FOUND,
      HTTP_MESSAGES.RESTORE_LINK_EXPIRED,
      HTTP_MESSAGES.USER_NOT_FOUND,
    ],
  })
  message: string
}
