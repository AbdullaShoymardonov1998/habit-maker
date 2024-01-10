import { HTTP_MESSAGES } from '@/consts/http-messages'
import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

export class UserNotFoundDto {
  @ApiProperty({
    description: 'Status code',
    example: HttpStatus.NOT_FOUND,
  })
  statusCode: HttpStatus.NOT_FOUND

  @ApiProperty({
    description: 'Error message',
    example: HTTP_MESSAGES.USER_NOT_FOUND,
  })
  message: string
}
