import { HTTP_MESSAGES } from '@/consts/http-messages'
import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

export class LoginWrongPasswordDto {
  @ApiProperty({
    description: 'Status code',
    example: HttpStatus.BAD_REQUEST,
  })
  statusCode: HttpStatus.BAD_REQUEST

  @ApiProperty({
    description: 'Error message',
    example: HTTP_MESSAGES.WRONG_PASSWORD,
  })
  message: string
}
