import { HTTP_MESSAGES } from '@/consts/http-messages'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'

export class GenerateLinkDto {
  @IsEmail()
  @ApiProperty({
    description: 'Email address',
    required: true,
    example: 'user@mail.com',
  })
  email: string
}

export class GenerateLinkResposeDto {
  @ApiProperty({
    description: 'Message',
    required: true,
    example: HTTP_MESSAGES.RESTORE_LINK_SENT,
  })
  message: string
}
